import * as fs from "fs";
import * as path from "path";
import { BaseLogger } from "./providers/base-logger";
import { LoggerRequestBody } from "./types/logger-request-body.interface";

/*

  Logger syntax
  <b><b> - bold
  <code><code> - code



 */


class Logger {

  private loggers: BaseLogger[] = [];

  constructor() {

    this.getLoggers().then(loggers => {
      for (let Logger of loggers){

        if (!Logger?.default) continue;

        try{
          const logger = new Logger.default();
          this.loggers.push(logger);
        }
        catch (e) {
          console.log(e.message)
        }
      }
    })
  }

  log(body: LoggerRequestBody) {
    for (let logger of this.loggers){
      logger.log(body);
    }
  }

  private async getLoggers(): Promise<{default: typeof BaseLogger}[]> {
    const loggersPaths = fs.readdirSync(path.join(__dirname, "providers"))
      .filter(file => file.match(/^.*-logger\.[tj]s$/) && !file.startsWith('base-logger'));
    return Promise.all(loggersPaths.map(async logger => {
      return await import(`./providers/${logger}`);
    }));
  }

}

export default new Logger();