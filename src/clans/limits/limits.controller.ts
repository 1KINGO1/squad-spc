import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { LimitsService } from "./limits.service";
import { CreateLimitDto } from "../dtos/create-limit.dto";
import { Auth, AuthRoles } from "../../auth/guards/auth.guard";
import { UpdateLimitDto } from "../dtos/update-limit.dto";

@Auth([AuthRoles.Root, AuthRoles.Admin])
@Controller("clans/:id/limits")
export class LimitsController {
  constructor(private limitsService: LimitsService) {}

  @Get("")
  async getClanLimits(@Param("id", ParseIntPipe) clanId: number) {
    return this.limitsService.getLimitsByClanId(clanId);
  }

  @Post("")
  async createClanLimit(
    @Param("id", ParseIntPipe) clanId: number,
    @Body() body: CreateLimitDto
  ) {
    return this.limitsService.createLimit(clanId, body);
  }

  @Delete(":limitId")
  async deleteClanLimit(@Param("limitId", ParseIntPipe) limitId: number){
    return this.limitsService.deleteLimit(limitId);
  }

  @Patch(":limitId")
  async updateClanLimit(
    @Param("limitId", ParseIntPipe) limitId: number,
    @Body() body: UpdateLimitDto
  ) {
    return this.limitsService.updateLimit(limitId, body);
  }
}
