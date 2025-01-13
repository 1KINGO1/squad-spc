import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, FindOptionsRelations, MoreThan, Repository } from "typeorm";
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
import { LoggerService } from "../logger/logger.service";
import { LoggerEntity } from "../logger/types/logger-request-body.interface";
import { LoggerLevel } from "../logger/types/logger-level.enum";
import replacePlaceholders from "../utils/replacePlaceholders";
import extractHeadersFromString from "../utils/extractHeadersFromString";
import { ConfigService } from "../config/config.service";

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
    private usersService: UsersService,
    private listsService: ListsService,
    private dataSource: DataSource,
    private loggerService: LoggerService,
    private configService: ConfigService
  ) {
  }

  async getPurchaseById(purchaseId: number, relations?: string[]): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({ where: { id: purchaseId }, relations });
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
      this.loggerService.log({
        level: LoggerLevel.CREATED,
        entity: LoggerEntity.Purchase,
        title: "Purchase created",
        fields: [
          { name: "ID", value: purchase.id + "" },
          { name: "Product Name", value: purchase.product_name },
          { name: "List", value: purchase.list.name + ` [ID: ${purchase.list.id}]` },
          { name: "Expire Date", value: purchase.expire_date === null ? "No expire" : purchase.expire_date + "" },
          { name: "Price", value: purchase.purchase_price + "" },
          { name: "Permissions", value: purchase.permissions }
        ],
        user
      });
      const purchaseLogBody = this.configService.get("logger.discord.webhook.purchasesThanksPurchaseBody");

      if (purchaseLogBody) {
        const serializedBody = replacePlaceholders(
          purchaseLogBody, { user, currency: this.configService.get("payment.general.currency"), purchase });
        const headers = extractHeadersFromString(serializedBody);

        purchaseLogBody ?
          this.loggerService.log({
            level: LoggerLevel.INFO,
            entity: LoggerEntity.PurchaseThanks,
            title: headers.title ?? undefined,
            message: headers.body
          })
          : undefined;
      }
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
        queryBuilder.where("(purchase.expire_date >= CURRENT_TIMESTAMP OR purchase.expire_date IS NULL) AND purchase.\"isCanceled\" = false");
      } else {
        queryBuilder.where("purchase.expire_date <= CURRENT_TIMESTAMP OR purchase.\"isCanceled\" = true");
      }
    }

    if (params.nolist !== undefined) {
      if (params.nolist) {
        queryBuilder.andWhere("list IS NULL");
      } else {
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
      page: Math.ceil(offset / (params.limit ?? 10)) + 1
    };
  }

  async deactivatePurchase(purchaseId: number, user: User) {
    const purchase = await this.getPurchaseById(purchaseId, ["list"]);
    if (purchase.isCanceled) {
      throw new BadRequestException("Purchase already canceled");
    }
    if (purchase.expire_date && purchase.expire_date < new Date()) {
      throw new BadRequestException("Purchase already expired");
    }

    purchase.isCanceled = true;
    purchase.cancel_date = new Date();
    await this.purchaseRepository.save(purchase);
    this.loggerService.log({
      level: LoggerLevel.UPDATED,
      entity: LoggerEntity.Purchase,
      title: "Purchase Deactivated",
      fields: [
        { name: "ID", value: purchase.id + "" },
        { name: "Owner", value: purchase.username + ` [SteamID: ${purchase.steam_id}]` },
        { name: "Product Name", value: purchase.product_name },
        { name: "List", value: purchase.list.name + ` [ID: ${purchase.list.id}]` },
        { name: "Expire Date", value: purchase.expire_date === null ? "No expire" : purchase.expire_date + "" },
        { name: "Price", value: purchase.purchase_price + "" },
        { name: "Permissions", value: purchase.permissions }
      ],
      user
    });
    return purchase;
  }

  async activatePurchase(purchaseId: number) {
    const purchase = await this.getPurchaseById(purchaseId, ["list"]);
    if (!purchase.isCanceled) {
      throw new BadRequestException("Purchase already active");
    }

    const timeLeft = purchase.expire_date ? purchase.expire_date.getTime() - purchase.cancel_date.getTime() : 0;

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
    this.loggerService.log({
      level: LoggerLevel.UPDATED,
      entity: LoggerEntity.Purchase,
      title: "Purchase Activated",
      fields: [
        { name: "ID", value: purchase.id + "" },
        { name: "Owner", value: purchase.username + ` [SteamID: ${purchase.steam_id}]` },
        { name: "Product Name", value: purchase.product_name },
        { name: "List", value: purchase.list.name + ` [ID: ${purchase.list.id}]` },
        { name: "Expire Date", value: purchase.expire_date === null ? "No expire" : purchase.expire_date + "" },
        { name: "Price", value: purchase.purchase_price + "" },
        { name: "Permissions", value: purchase.permissions }
      ],
      user
    });
    return purchase;
  }

  async editPurchaseById(purchaseId: number, params: EditPurchaseDto, user: User) {
    const purchase = await this.getPurchaseById(purchaseId);

    let edited = {
      username: false,
      steam_id: false,
      expire_date: false,
      listId: false,
      productId: false
    };

    if (params?.username && params?.username !== purchase.username) {
      purchase.username = params.username;
      edited.username = true;
    }
    if (params?.steam_id && params?.steam_id !== purchase.steam_id) {
      purchase.steam_id = params.steam_id;
      edited.steam_id = true;
    }
    if (params?.expire_date && params?.expire_date !== purchase.expire_date) {
      purchase.expire_date = params.expire_date;
      edited.expire_date = true;
    }
    if (params?.listId && params?.listId !== purchase.listId) {
      purchase.list = await this.listsService.getById(params.listId);
      purchase.listId = purchase.list.id;
      if (purchase.productId !== null) {
        try {
          const product = await this.productsService.getById(purchase.productId);
          if (product.list.id !== params.listId) {
            purchase.productId = null;
            edited.productId = true;
          }
        } catch (e) {
          purchase.productId = null;
          edited.productId = true;
        }
      }
      edited.listId = true;
    }
    if (params?.productId && params?.productId !== purchase.productId) {
      const product = await this.productsService.getById(params.productId);
      if (product.list.id !== purchase.listId) throw new BadRequestException("Product doesn't exist on this list");
      purchase.product = product;
      purchase.product_name = product.name;
      purchase.product_duration = product.duration;
      purchase.permissions = this.serializePermissions(product.permissions);
      edited.productId = true;
    }

    await this.purchaseRepository.save(purchase);
    this.loggerService.log({
      level: LoggerLevel.UPDATED,
      entity: LoggerEntity.Purchase,
      title: "Purchase updated",
      fields: [
        { name: "ID", value: purchase.id + "" },
        edited.username || edited.steam_id ? {
          name: "Owner [EDITED]",
          value: purchase.username + ` [SteamID: ${purchase.steam_id}]`
        } : undefined,
        edited.productId ? { name: "Product Name [EDITED]", value: purchase.product_name } : undefined,
        edited.listId ? { name: "List [EDITED]", value: purchase.list.name + ` [ID: ${purchase.list.id}]` } : undefined,
        edited.expire_date ? {
          name: "Expire Date [EDITED]",
          value: purchase.expire_date === null ? "No expire" : purchase.expire_date + ""
        } : undefined,
        edited.productId ? { name: "Permissions [EDITED]", value: purchase.permissions } : undefined
      ],
      user
    });
    return purchase;
  }
}
