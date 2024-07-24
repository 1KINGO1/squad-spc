import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { LimitsService } from "./limits.service";
import { CreateLimitDto } from "../dtos/create-limit.dto";
import { Auth, AuthRoles } from "../../auth/guards/auth.guard";
import { UpdateLimitDto } from "../dtos/update-limit.dto";
import { User } from "../../users/entity/User.entity";

@Controller("clans/:id/limits")
export class LimitsController {
  constructor(private limitsService: LimitsService) {}

  @Auth([AuthRoles.ClanLeader, AuthRoles.Root, AuthRoles.Admin])
  @Get("")
  async getClanLimits(@Param("id", ParseIntPipe) clanId: number, @Req() req: Request & {user: User }) {
    return this.limitsService.getLimitsByClanId(clanId, req.user);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Post("")
  async createClanLimit(
    @Param("id", ParseIntPipe) clanId: number,
    @Body() body: CreateLimitDto
  ) {
    return this.limitsService.createLimit(clanId, body);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Post("replace")
  async replaceClanLimits(
    @Param("id", ParseIntPipe) clanId: number,
    @Body(new ParseArrayPipe({items: CreateLimitDto, separator: ","})) body: CreateLimitDto[]
  ) {
    return this.limitsService.replaceLimits(clanId, body);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Delete(":limitId")
  async deleteClanLimit(@Param("limitId", ParseIntPipe) limitId: number){
    return this.limitsService.deleteLimit(limitId);
  }

  @Auth([AuthRoles.Root, AuthRoles.Admin])
  @Patch(":limitId")
  async updateClanLimit(
    @Param("limitId", ParseIntPipe) limitId: number,
    @Body() body: UpdateLimitDto
  ) {
    return this.limitsService.updateLimit(limitId, body);
  }
}
