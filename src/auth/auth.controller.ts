import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('steam'))
  async login() {}

  @Get('return')
  @UseGuards(AuthGuard('steam'))
  async return(@Req() req: Request & {user: any}, @Res() res: Response){
    const {access_token} = await this.authService.signin(req.user.steamid, req.user.avatarmedium, req.user.personaname);
    res.cookie(
      'access_token',
      access_token,
      // Cookie alive for 29 days
      {httpOnly: false, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 29)});
    res.redirect('/');
  }
}
