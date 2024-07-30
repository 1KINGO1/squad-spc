import { Body, Controller, Get, Param, Put, Query, Req } from "@nestjs/common";
import { User } from "../users/entity/User.entity";
import { ConfigService } from "./config.service";
import { Auth, AuthRoles } from "../auth/guards/auth.guard";
import UpdateConfigDto from "./dto/UpdateConfigDto";

@Controller('config')
@Auth([AuthRoles.Root, AuthRoles.Admin, AuthRoles.ClanLeader, AuthRoles.Guest])
export class ConfigController {

  constructor(private configService: ConfigService) {
  }

  @Get("")
  async getConfig(
    @Req() req: Request & {user: User},
    @Query("include") include: string
  ) {
    if (include !== undefined) {
      const includes = include.split(",");
      return this.configService.getSome(includes, req.user);
    }
    else {
      return this.configService.getAll(req.user);
    }
  }

  @Get("settings")
  @Auth([AuthRoles.Root])
  async getSettings(
    @Req() req: Request & {user: User}
  ) {
    return this.configService.getSettings();
  }

  @Put(":key")
  async setConfig(
    @Req() req: Request & {user: User},
    @Param("key") key: string,
    @Body() body: UpdateConfigDto
  ) {
    return this.configService.set(key, body.value, req.user);
  }
}
