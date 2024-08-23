import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entity/Product.entity";
import { ListsModule } from "../lists/lists.module";
import { PermissionsModule } from "../permissions/permissions.module";

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product]), ListsModule, PermissionsModule]
})
export class ProductsModule {}
