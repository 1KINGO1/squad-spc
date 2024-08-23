import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./entity/Product.entity";
import { CreateProductDto } from "./dtos/create-product.dto";
import { ListsService } from "../lists/lists.service";
import { PermissionsService } from "../permissions/permissions.service";
import { UpdateProductDto } from "./dtos/update-product.dto";
import { User } from "../users/entity/User.entity";
import { AuthRoles } from "../auth/guards/auth.guard";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private permissionsService: PermissionsService,
    private listsService: ListsService,
  ) {}

  async getById(id: number) {
    const product = await this.productsRepository.findOne({where: {id}, relations: ["list", "permissions"]});
    if (!product) {
      throw new BadRequestException("Product does not exist");
    }
    return product;
  }
  async getProducts(user: User) {
    if ([AuthRoles.Admin, AuthRoles.Root].includes(user.permission)) {
      return await this.productsRepository.find({ relations: ["list", "permissions"] });
    }

    return await this.productsRepository.find({ where: {shouldSale: true}, relations: ["list", "permissions"] })
  }
  async createProduct(createProductDto: CreateProductDto) {
    const permissions = await this.getPermissionsFromIds(createProductDto.permissions);

    const list = await this.listsService.getById(createProductDto.listId);
    if (!list) {
      throw new BadRequestException("List does not exist");
    }

    const product = this.productsRepository.create({
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      tag: createProductDto.tag ?? null,
      tagColor: createProductDto.tagColor ?? null,
      productColor: createProductDto.productColor ?? null,
      duration: createProductDto.duration ?? null,
      list,
      permissions,
    });

    await this.productsRepository.save(product);
    return product;
  }
  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getById(id);

    Object.assign(product, updateProductDto);

    if (updateProductDto.permissions) {
      product.permissions = await this.getPermissionsFromIds(updateProductDto.permissions);
    }

    await this.productsRepository.save(product);
    return product;
  }
  async deleteProduct(id: number) {
    const product = await this.getById(id);
    await this.productsRepository.remove(product);
    return {...product, id};
  }
  private async getPermissionsFromIds(permissionIds: number[]) {
    if (permissionIds.length <= 0) {
      throw new BadRequestException("permissions must be not empty array");
    }
    const permissions = await this.permissionsService.getPermissionsByIds(permissionIds.map(permission => +permission));
    if (permissions.length !== permissionIds.length) {
      throw new BadRequestException("Some permissions do not exist");
    }
    if (!permissions.length) {
      throw new BadRequestException("Product must have at least one permission");
    }

    return permissions;
  }
}
