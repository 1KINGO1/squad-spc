import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { ListsService } from "./lists.service";
import { CreateListDto } from "./dtos/create-list.dto";
import { UpdateListDto } from "./dtos/update-list.dto";

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
  async getList(@Param('id') id: number) {
    return this.listsService.getById(+id);
  }

  @Post('')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async createList(@Body() body: CreateListDto){
    return this.listsService.create(body);
  }

  @Delete(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async deleteList(@Param('id') id: number){
    return this.listsService.deleteById(+id);
  }

  @Patch(':id')
  @Auth([AuthRoles.Admin, AuthRoles.Root])
  async editList(@Param('id') id: number, @Body() body: UpdateListDto) {
    return this.listsService.update(+id, body);
  }
}
