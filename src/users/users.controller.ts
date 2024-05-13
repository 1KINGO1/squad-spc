import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Patch, Query, Req } from "@nestjs/common";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entity/User.entity";

@Controller("users")
@Auth([AuthRoles.Admin, AuthRoles.Root])
export class UsersController {

  constructor(private usersService: UsersService) {
  }

  @Get("test")
  async test() {
    return this.usersService.create({
      steam_id: "12345",
      username: "Test User",
      avatar_url: "https://example.com/avatar.jpg"
    });
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
        limit: parseInt(limit) > 0 && parseInt(limit) <= 100 ? parseInt(limit) : 20,
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

  // Todo: DELETE user
}