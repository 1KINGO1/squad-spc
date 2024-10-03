import { Module } from '@nestjs/common';
import { PurchasesService } from "./purchases.service";
import { PurchasesController } from "./purchases.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Purchase } from "./entity/Purchase.entity";
import { ProductsModule } from "../products/products.module";
import { PaymentsModule } from "../payments/payments.module";

@Module({
  providers: [PurchasesService],
  controllers: [PurchasesController],
  imports: [TypeOrmModule.forFeature([Purchase]), ProductsModule, PaymentsModule],
  exports: [PurchasesService]
})
export class PurchasesModule {}
