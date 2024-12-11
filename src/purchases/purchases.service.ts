import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, MoreThan, Repository } from "typeorm";
import { Purchase } from "./entity/Purchase.entity";
import { User } from "../users/entity/User.entity";
import { PaymentsService } from "../payments/payments.service";
import { ProductsService } from "../products/products.service";
import { Balance } from "../payments/entity/Balance.entity";
import GetAllPurchasesDto from "./dto/get-all-purchases.dto";
import { UsersService } from "../users/users.service";
import EditPurchaseDto from "./dto/edit-purchase.dto";
import { ListsService } from "../lists/lists.service";
import { Permission } from "src/permissions/entity/Permission.entity";

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private listsService: ListsService,
    private dataSource: DataSource
  ) {
  }

  async getPurchaseById(purchaseId: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({id: purchaseId});
    if (!purchase) {
      throw new NotFoundException("Purchase not found");
    }
    return purchase;
  }

  private serializePermissions(permissions: Permission[]): string {
    return permissions.map(permission => permission.value).join(",");
  }

  async createPurchase(productId: number, desiredPrice: number, user: User): Promise<Purchase> {
    const product = await this.productsService.getById(productId);
    if (!product || !product.shouldSale) {
      throw new NotFoundException("Product not found or not accessible");
    }
    if (product.price !== desiredPrice) {
      throw new BadRequestException("Desired price does not match the product price");
    }

    const existingPurchases = await this.getActiveUserPurchasesByProductId(user, productId);
    if (existingPurchases.length > 0) {
      throw new BadRequestException("You already have bought this product. Cancel it to buy again");
    }

    const userBalance = await this.paymentsService.getOrCreateBalance(user);
    if (userBalance.balance < product.price) {
      throw new BadRequestException("Insufficient funds");
    }

    let purchase = new Purchase();
    purchase.steam_id = user.steam_id;
    purchase.username = user.username;
    purchase.permissions = this.serializePermissions(product.permissions);
    purchase.product_name = product.name;
    purchase.product_duration = product.duration;
    purchase.purchase_price = product.price;
    purchase.isCanceled = false;
    purchase.expire_date = product.duration ? new Date(Date.now() + product.duration * 1000) : null;
    purchase.list = product.list;
    purchase.product = product;

    try {
      await this.dataSource.transaction("READ COMMITTED", async entityManager => {
        purchase = await entityManager.save(Purchase, purchase);
        await entityManager.update(Balance, { user }, { balance: userBalance.balance - product.price });
      });
    } catch (e) {
      throw new InternalServerErrorException("Something went wrong. Try again");
    }

    return purchase;
  }
  async getUserPurchases(user: User): Promise<Purchase[]> {
    return this.purchaseRepository.find({ where: { steam_id: user.steam_id }, relations: ["list"] });
  }
  async getActivePurchases(user: User): Promise<Purchase[]> {
    const currentDate = new Date();

    const patches = await this.getUserPurchases(user);
    return patches.filter(purchase =>
      (!purchase.expire_date || purchase.expire_date > currentDate) &&
      purchase.isCanceled === false
    );
  }
  async getActiveUserPurchasesByProductId(user: User, productId: number): Promise<Purchase[]> {
    const currentDate = new Date();

    const patches = await this.getUserPurchases(user);
    return patches.filter(purchase =>
      purchase.productId === productId &&
      (!purchase.expire_date || purchase.expire_date > currentDate) &&
      purchase.isCanceled === false
    );
  }
  async getActivePurchasesByListPath(listPath: string): Promise<Purchase[]> {
    const currentDate = new Date();

    return this.purchaseRepository.find({
      where: {
        list: { path: listPath },
        expire_date: MoreThan(currentDate),
        isCanceled: false
      }
    });
  }
  async getAllPurchasesWithFilters(params: GetAllPurchasesDto) {
    const limit = params.limit ?? 10;
    const offset = params.offset ?? 0;

    const queryBuilder = this.purchaseRepository.createQueryBuilder("purchase");
    queryBuilder.leftJoinAndSelect("purchase.list", "list");

    if (params.active !== undefined) {
      if (params.active) {
        queryBuilder.where("(purchase.expire_date >= CURRENT_TIMESTAMP OR purchase.expire_date IS NULL) AND purchase.\"isCanceled\" = false")
      }
      else {
        queryBuilder.where("purchase.expire_date <= CURRENT_TIMESTAMP OR purchase.\"isCanceled\" = true")
      }
    }

    if (params.nolist !== undefined) {
      if (params.nolist) {
        queryBuilder.andWhere("list IS NULL");
      }
      else {
        queryBuilder.andWhere("list IS NOT NULL");
      }
    }

    if (params.search !== undefined) {
      queryBuilder.andWhere(
        "purchase.steam_id ILIKE :search",
        { search: `%${params.search}%` }
      );
    }

    queryBuilder.orderBy("purchase.create_date", "DESC");

    queryBuilder.limit(limit).offset(offset);

    const totalCount = await queryBuilder.getCount();

    return {
      purchases: await queryBuilder.getMany(),
      total: totalCount,
      limit: params.limit ?? 10,
      pageCount: Math.ceil(totalCount / (params.limit ?? 10)),
      page: Math.ceil(offset / (params.limit ?? 10)) + 1,
    };
  }
  async deactivatePurchase(purchaseId: number) {
    const purchase = await this.getPurchaseById(purchaseId);
    if (purchase.isCanceled) {
      throw new BadRequestException("Purchase already canceled");
    }
    if (purchase.expire_date && purchase.expire_date < new Date()) {
      throw new BadRequestException("Purchase already expired");
    }

    purchase.isCanceled = true;
    purchase.cancel_date = new Date();
    await this.purchaseRepository.save(purchase);
    return purchase;
  }
  async activatePurchase(purchaseId: number) {
    const purchase = await this.getPurchaseById(purchaseId);
    if (!purchase.isCanceled) {
      throw new BadRequestException("Purchase already active");
    }

    const timeLeft =  purchase.expire_date ? purchase.expire_date.getTime() - purchase.cancel_date.getTime() : 0;

    if (timeLeft < 0) {
      throw new NotFoundException("Purchase already expired");
    }

    const user = await this.usersService.findBySteamId(purchase.steam_id);
    const activePurchases = await this.getActivePurchases(user);
    if (activePurchases.find(p => p.productId === purchase.productId)) {
      throw new BadRequestException("User already has active purchase for this product");
    }

    const newExpireDate = purchase.expire_date ? new Date(Date.now() + timeLeft) : null;

    purchase.isCanceled = false;
    purchase.cancel_date = null;
    purchase.expire_date = newExpireDate;
    await this.purchaseRepository.save(purchase);
    return purchase;
  }

  async editPurchaseById(purchaseId: number, params: EditPurchaseDto) {
    const purchase = await this.getPurchaseById(purchaseId);

    if (params?.username) {
      purchase.username = params.username;
    }
    if (params?.steam_id) {
      purchase.steam_id = params.steam_id;
    }
    if (params?.expire_date) {
      purchase.expire_date = params.expire_date;
    }
    if (params?.listId) {
      purchase.list = await this.listsService.getById(params.listId);
      purchase.listId = purchase.list.id;
      if (purchase.productId !== null) {
        try {
          const product = await this.productsService.getById(purchase.productId);
          if (product.list.id !== params.listId) {
            purchase.productId = null;
          }
        } catch (e) {
          purchase.productId = null;
        }
      }
    }
    if (params?.productId) {
      const product = await this.productsService.getById(params.productId);
      if (product.list.id !== purchase.listId) throw new BadRequestException("Product doesn't exist on this list");
      purchase.product = product;
      purchase.product_name = product.name;
      purchase.product_duration = product.duration;
      purchase.permissions = this.serializePermissions(product.permissions)
    }

    await this.purchaseRepository.save(purchase);
    return purchase;
  }
}
