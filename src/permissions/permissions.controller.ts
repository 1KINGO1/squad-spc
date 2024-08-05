import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionDto } from "./dtos/create-permission.dto";
import { CreateGroupDto } from "./dtos/create-group.dto";
import { UpdateGroupDto } from "./dtos/update-group.dto";

@Auth([AuthRoles.Admin, AuthRoles.Root])
@Controller('permissions')
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @Get('')
  async getAll() {
    return this.permissionsService.getGroupsWithPermissions();
  }

  /* ========================================================= */

  @Get('groups')
  async getGroups(){
    return this.permissionsService.getGroups();
  }

  @Get('groups/:id')
  async getGroup(@Param('id') id: string){
    return this.permissionsService.getGroupById(+id);
  }

  @Post('groups')
  async createGroup(@Body() body: CreateGroupDto, @Req() req: Express.Request){
    return this.permissionsService.createGroup(body, req.user);
  }

  @Patch('groups/:id')
  async updateGroup(@Param('id') id: string, @Body() body: UpdateGroupDto, @Req() req: Express.Request){
   return this.permissionsService.updateGroup(+id, body, req.user);
  }

  @Delete('groups/:id')
  async deleteGroup(@Param('id') id: string, @Req() req: Express.Request){
    return this.permissionsService.deleteGroup(+id, req.user);
  }

  /* ========================================================= */

  @Get('permissions')
  async getPermissions(){
    return this.permissionsService.getPermissions();
  }

  @Post('permissions')
  async createPermission(@Body() body: CreatePermissionDto){
    return this.permissionsService.createPermission(body);
  }
  //
  // @Delete('permissions/:id')
  // async deletePermission(@Param('id') id: string){
  //   return this.permissionsService.deletePermission(+id);
  // }
}
