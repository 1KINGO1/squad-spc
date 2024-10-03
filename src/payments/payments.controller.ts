import { Controller, Get, Param, ParseIntPipe, Req } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";

@Auth([AuthRoles.ClanLeader, AuthRoles.Root, AuthRoles.Admin, AuthRoles.Guest])
@Controller('payments')
export class PaymentsController {

  constructor(private paymentsService: PaymentsService) {}

  @Get("balance")
  async getBalance(@Req() req: Express.Request){
    return this.paymentsService.getOrCreateBalance(req.user);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Get("balance/:steamId")
  async getBalanceBySteamId(@Param("steamId") steamId: string){
    return this.paymentsService.getOrCreateBalanceBySteamId(steamId);
  }
}
