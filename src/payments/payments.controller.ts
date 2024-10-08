import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query, Req } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { UpdateUserBalanceDto } from "./dto/update-user-balance.dto";

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

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Patch("balance/:steamId")
  async addBalance(@Req() req: Express.Request,
                   @Param("steamId") steamId: string,
                   @Body() body: UpdateUserBalanceDto
  ){
    return this.paymentsService.setBalance(steamId, body.amount, body.currentBalance);
  }
}
