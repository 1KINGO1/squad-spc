import { Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../../users/users.service";
import { NextFunction } from "express";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {

  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async use(req: Request & {cookies: any, user: any}, res: Response, next: NextFunction) {
    let access_token = this.extractTokenFromHeader(req);
    if (!access_token) return next();

    try {
      const { steam_id } = await this.jwtService.verifyAsync(
        access_token
      );
      if (!steam_id) return next();

      const user = await this.userService.findBySteamId(steam_id);
      if (!user) return next();

      req.user = user;
    } catch (e) {}


    return next();
  }

  private extractTokenFromHeader(request: Request & any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}