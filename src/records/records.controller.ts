import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { User } from "../users/entity/User.entity";
import { CreateRecordDto } from "./dtos/create-record.dto";

@Controller('records')
@Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

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

}
