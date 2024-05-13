import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { SteamStrategy } from "./strategies/steam.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import config from "../config";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";


@Module({
  providers: [AuthService, SteamStrategy],
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: config.JWT_SECRET,
      signOptions: { expiresIn: "30d" }
    })],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .exclude('auth')
      .forRoutes('*');
  }
}
