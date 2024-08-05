import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "../config/config.service";
import { BaseLogger } from "./providers/base-logger";
import * as fs from "fs";
import * as path from "path";
import { LoggerRequestBody } from "./types/logger-request-body.interface";

@Injectable()
export class LoggerService implements OnModuleInit{
  constructor(private configService: ConfigService) {}

  private loggers: BaseLogger[] = [];

  public async onModuleInit() {
    this.getLoggers().then(loggers => {
      for (let Logger of loggers){

        if (!Logger?.default) continue;

        try{
          const logger = new Logger.default(this.configService);
          this.loggers.push(logger);
        }
        catch (e) {
          console.log(e.message)
        }
      }
    });
  }
  private async getLoggers(): Promise<{default: typeof BaseLogger}[]> {
    const loggersPaths = fs.readdirSync(path.join(__dirname, "providers"))
      .filter(file => file.match(/^.*-logger\.[tj]s$/) && !file.startsWith('base-logger'));
    return Promise.all(loggersPaths.map(async logger => {
      return await import(`./providers/${logger}`);
    }));
  }

  public async log(body: LoggerRequestBody) {
    for (let logger of this.loggers){
      await logger.log(body);
    }
  }
}
