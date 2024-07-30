import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigController } from "./config.controller";
import configSettings from "./data/config.settings";

@Global()
@Module({
  providers: [
    ConfigService,
    {
      provide: "CONFIG_SETTINGS",
      useFactory: () => {
        return configSettings;
      }
    },
    {
      provide: "CONFIG_SAVE_PATH",
      useFactory: () => {
        return "config.json";
      }
    },
  ],
  controllers: [ConfigController],
  exports: [ConfigService]
})
export class ConfigModule {
}
