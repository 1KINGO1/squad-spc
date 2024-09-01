import { Controller, Get, Param, ParseIntPipe, Post, Query, Req } from "@nestjs/common";
import { User } from "../users/entity/User.entity";
import { PurchasesService } from "./purchases.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";

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

  @Get("")
  async getUserPurchases(@Req() req: Express.Request) {
    return this.purchasesService.getUserPurchases(req.user);
  }
}
