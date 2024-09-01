import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, MoreThan, Repository } from "typeorm";
import { Purchase } from "./entity/Purchase.entity";
import { User } from "../users/entity/User.entity";
import { PaymentsService } from "../payments/payments.service";
import { ProductsService } from "../products/products.service";
import { Balance } from "../payments/entity/Balance.entity";
import { Record } from "../records/entity/Record.entity";

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    private paymentsService: PaymentsService,
    private productsService: ProductsService,
    private dataSource: DataSource
  ) {
  }

  async createPurchase(productId: number, desiredPrice: number, user: User): Promise<Purchase> {
    const product = await this.productsService.getById(productId);
    if (!product || !product.shouldSale) {
      throw new NotFoundException("Product not found or not accessible");
    }
    if (product.price !== desiredPrice) {
      throw new NotFoundException("Desired price does not match the product price");
    }

    const existingPurchases = await this.getActiveUserPurchasesByProductId(user, productId);
    if (existingPurchases.length > 0) {
      throw new NotFoundException("You already have bought this product. Cancel it to buy again");
    }

    const userBalance = await this.paymentsService.getOrCreateBalance(user);
    if (userBalance.balance < product.price) {
      throw new NotFoundException("Insufficient funds");
    }

    let purchase = new Purchase();
    purchase.steam_id = user.steam_id;
    purchase.username = user.username;
    purchase.permissions = product.permissions.map(permission => permission.name).join(",");
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
    return this.purchaseRepository.find({ where: { steam_id: user.steam_id } });
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
}
