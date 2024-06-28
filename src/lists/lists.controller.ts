import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from "@nestjs/common";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { ListsService } from "./lists.service";
import { CreateListDto } from "./dtos/create-list.dto";
import { UpdateListDto } from "./dtos/update-list.dto";
import { User } from "../users/entity/User.entity";

@Controller('lists')
export class ListsController {

  constructor(private listsService: ListsService) {}

  @Get('')
  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  async getLists() {
    return this.listsService.getAll();
  }

  @Get(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async getList(@Param('id', ParseIntPipe) id: number) {
    return this.listsService.getById(+id);
  }

  @Get(':id/clans')
  @Auth([AuthRoles.ClanLeader, AuthRoles.Admin, AuthRoles.Root])
  async getListClans(@Param('id', ParseIntPipe) id: number, @Req() req: {user: User}) {
    return this.listsService.getListClans(id, req.user);
  }

  @Post('')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async createList(@Body() body: CreateListDto){
    return this.listsService.create(body);
  }

  @Delete(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async deleteList(@Param('id', ParseIntPipe) id: number){
    return this.listsService.deleteById(id);
  }

  @Patch(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async editList(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateListDto) {
    return this.listsService.update(id, body);
  }
}
