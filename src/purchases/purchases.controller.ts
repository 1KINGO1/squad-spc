import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe, Patch,
  Post,
  Query,
  Req,
  ValidationPipe
} from "@nestjs/common";
import { User } from "../users/entity/User.entity";
import { PurchasesService } from "./purchases.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import GetAllPurchasesDto from "./dto/get-all-purchases.dto";
import EditPurchaseDto from "./dto/edit-purchase.dto";

@Controller('purchases')
@Auth([AuthRoles.Guest, AuthRoles.ClanLeader, AuthRoles.Root, AuthRoles.Admin])
export class PurchasesController {

  constructor(
    private purchasesService: PurchasesService
  ) {}

  @Post("products/:productId")
  async createPurchase(
    @Param("productId", ParseIntPipe) productId: number,
    @Query("desiredPrice", ParseIntPipe) desiredPrice: number,
    @Req() req: Express.Request & { user: User }
  ){
    return this.purchasesService.createPurchase(productId, desiredPrice, req.user);
  }

  @Get("me")
  async getUserPurchases(@Req() req: Express.Request) {
    return this.purchasesService.getUserPurchases(req.user);
  }

  @Get("me/active")
  async getActivePurchases(@Req() req: Express.Request) {
    return this.purchasesService.getActivePurchases(req.user);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Get("all")
  async getAllPurchases(
    @Query() query: GetAllPurchasesDto
  ) {
    return this.purchasesService.getAllPurchasesWithFilters(query);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Patch("deactivate/:purchaseId")
  async cancelPurchase(
    @Param("purchaseId", ParseIntPipe) purchaseId: number,
    @Req() req : Express.Request
  ) {
    return this.purchasesService.deactivatePurchase(purchaseId, req.user);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Patch("activate/:purchaseId")
  async completePurchase(
    @Param("purchaseId", ParseIntPipe) purchaseId: number
  ) {
    return this.purchasesService.activatePurchase(purchaseId);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Patch(":purchaseId")
  async editPurchase(
    @Param("purchaseId", ParseIntPipe) purchaseId: number,
    @Body() body: EditPurchaseDto,
    @Req() req: Express.Request
  ) {
    return this.purchasesService.editPurchaseById(purchaseId, body, req.user);
  }
}
