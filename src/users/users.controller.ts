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

  // Todo: Remove this test route
  @Get("test")
  async test() {
    await this.usersService.create({
      steam_id: "1",
      username: "Test User 1",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "2",
      username: "Test User 2",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "3",
      username: "Test User 3",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "4",
      username: "Test User 4",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "5",
      username: "Test User 5",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "6",
      username: "Test User 6 ",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "7",
      username: "Test User 7",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "8",
      username: "Test User 8",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "9",
      username: "Test User 9",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "10",
      username: "Test User 10",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "11",
      username: "Test User 11",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "12",
      username: "Test User 12",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "13",
      username: "Test User 13",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "14",
      username: "Test User 14",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "15",
      username: "Test User 15",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "16",
      username: "Test User 16",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "17",
      username: "Test User 17",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "18",
      username: "Test User 18",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "19",
      username: "Test User 19",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "20",
      username: "Test User 20",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "21",
      username: "Test User 21",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "22",
      username: "Test User 22",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "23",
      username: "Test User 23",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "24",
      username: "Test User 24",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "25",
      username: "Test User 25",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "26",
      username: "Test User 26",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "27",
      username: "Test User 27",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "28",
      username: "Test User 28",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "29",
      username: "Test User 29",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });
    await this.usersService.create({
      steam_id: "30",
      username: "Test User 30",
      avatar_url: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
    });

    return "OK"
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

  @Auth([AuthRoles.Root])
  @Delete(":id")
  async delete(
    @Req() req: Request & {user: User},
    @Param("id", ParseIntPipe) id: number
  ){
    return this.usersService.deleteById(id, req.user);
  }
}
