import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req
} from "@nestjs/common";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entity/User.entity";

@Controller("users")
@Auth([AuthRoles.Admin, AuthRoles.Root])
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get()
  async getAll(
    @Query("limit") limit: string,
    @Query("offset") offset: string,
    @Query("orderBy") orderBy: "ASC" | "DESC",
    @Query("orderByField") orderByField: string
  ) {
    return this.usersService.getAll(
      {
        limit: parseInt(limit) > 0 && parseInt(limit) <= 100 ? parseInt(limit) : undefined,
        orderBy: ["ASC", "DESC"].includes(orderBy) ? orderBy : undefined,
        orderByField,
        offset: parseInt(offset) > 0 ? parseInt(offset) : 0
      }
    );
  }

  @Patch(":id")
  async update(
    @Req() req: Request & {user: User},
    @Body() body: UpdateUserDto,
    @Param("id", ParseIntPipe) id: number
  ) {
    return this.usersService.update(id, req.user, body);
  }

  @Auth([AuthRoles.Root])
  @Delete(":id")
  async delete(
    @Req() req: Request & {user: User},
    @Param("id", ParseIntPipe) id: number
  ){
    return this.usersService.deleteById(id, req.user);
  }

  @Get("test")
  async testUser() {
    return this.usersService.create({
      steam_id: "76561198990669263",
      username: "Test User",
      avatar_url: ""
    })
  }
}
