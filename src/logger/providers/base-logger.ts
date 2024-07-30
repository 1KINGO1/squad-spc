import { LoggerRequestBody } from "../types/logger-request-body.interface";
import { ConfigService } from "../../config/config.service";

export class BaseLogger {

  constructor(protected configService: ConfigService) {}

  log(body: LoggerRequestBody) {
    return null;
  };
}