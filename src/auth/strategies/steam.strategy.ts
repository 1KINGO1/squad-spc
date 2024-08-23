import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-steam";
import config from "../../config";

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {

  constructor() {
    super({
      returnURL: `${config.HOST}${config.API_PREFIX}/auth/return`,
      realm: `${config.HOST}`,
      apiKey: config.STEAM_API_KEY,
    });
  }

  validate(identifier, profile, done) {
    if (profile?._json?.steamid){
      done(null, profile._json);
    }
  }
}