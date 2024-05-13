import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  private async signup(steam_id: string, avatar: string, name: string) {
    const username = name.slice(0, 49);
    const avatar_url = avatar.slice(0, 499);

    return this.usersService.create({ steam_id, avatar_url, username });
  }

  async signin(steam_id: string, avatar: string, name: string) {
    let user = await this.usersService.findBySteamId(steam_id);
    if (!user) {
      user = await this.signup(steam_id, avatar, name);
    }

    const payload = {steam_id: user.steam_id};

    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }
}
