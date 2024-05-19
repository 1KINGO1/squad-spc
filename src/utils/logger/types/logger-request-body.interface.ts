import { LoggerLevel } from "./logger-level.enum";

export interface LoggerRequestBody{
  message: string;
  level: LoggerLevel;
}