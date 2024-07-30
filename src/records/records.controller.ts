import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { CreateRecordDto } from "./dtos/create-record.dto";

@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  @Get('/clan/:clanId/list/:listId')
  async getRecords(
    @Req() req: Request & {user: User },
    @Param('clanId', ParseIntPipe) clanId: number,
    @Param('listId', ParseIntPipe) listId: number
  ) {
    return await this.recordsService.getRecords(
      {
        clanId,
        listId,
        user: req.user
      }
    );
  }

  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  @Post('/clan/:clanId/list/:listId')
  async createRecord(
    @Req() req: Request & {user: User },
    @Param('clanId', ParseIntPipe) clanId: number,
    @Param('listId', ParseIntPipe) listId: number,
    @Body() body: CreateRecordDto
  ) {
    return await this.recordsService.createRecord(
      {
        clanId,
        listId,
        user: req.user,
        ...body
      }
    );
  }

  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  @Delete(':recordId')
  async deleteRecord(
    @Req() req: Request & {user: User },
    @Param('recordId', ParseIntPipe) recordId: number
  ) {
    return this.recordsService.deleteRecord(recordId, req.user);
  }

  @Auth([AuthRoles.Guest, AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  @Get('me')
  async getMyRecords(@Req() req: Request & {user: User }) {
    return this.recordsService.getCurrentUserRecords(req.user);
  }
}
