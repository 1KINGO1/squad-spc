import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/update-product.dto";

@Controller('products')
@Auth([AuthRoles.Guest, AuthRoles.Root, AuthRoles.Admin, AuthRoles.ClanLeader])
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  async getProducts(@Req() req: Express.Request) {
    return this.productsService.getProducts(req.user);
  }

  @Auth([AuthRoles.Root])
  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }

  @Auth([AuthRoles.Root])
  @Patch(":id")
  async updateProduct(@Param("id") id: number, @Body() body: UpdateProductDto) {
    return this.productsService.updateProduct(+id, body);
  }

  @Auth([AuthRoles.Root])
  @Delete(":id")
  async getProduct(@Param("id") id: number) {
    return this.productsService.deleteProduct(+id);
  }
}
