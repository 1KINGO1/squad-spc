import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from "@nestjs/common";
import { ClansService } from "./clans.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { CreateClanDto } from "./dtos/create-clan.dto";
import { UpdateClanDto } from "./dtos/update-clan.dto";

@Controller("clans")
export class ClansController {
  constructor(private clansService: ClansService) {
  }

  @Get()
  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  async getAllClans(
    @Req() req: Request & { user: User },
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("include") include: string = "",
    @Query("list_id") listId: string
  ) {
    return await this.clansService.getAvailableClans(
      {
        user: req.user,
        limit: limit !== undefined ? parseInt(limit) : undefined,
        offset: parseInt(offset),
        listId: parseInt(listId) || undefined,
        include: include
          .split(",")
          .filter(value =>
            [
              "clan_leaders",
              "allowed_lists",
              "limits"
            ]
              .includes(value)
          ) as any[]
      }
    );
  }

  @Post()
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async createClan(@Body() body: CreateClanDto) {
    return await this.clansService.createClan(body);
  }

  @Delete(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async deleteClan(@Param("id", ParseIntPipe) id: number) {
    return await this.clansService.deleteClan(id);
  }

  @Patch(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async updateClan(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateClanDto) {
    return await this.clansService.updateClan(id, body);
  }
}
