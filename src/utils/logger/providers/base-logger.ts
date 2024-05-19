import { LoggerRequestBody } from "../types/logger-request-body.interface";

export class BaseLogger {

  constructor(...args: any[]) {}

  log(body: LoggerRequestBody) {
    return null;
  };
}