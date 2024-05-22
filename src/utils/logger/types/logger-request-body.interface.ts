import { LoggerLevel } from "./logger-level.enum";

export interface LoggerRequestBody{
  title?: string;
  message?: string;
  level: LoggerLevel;
  image_url?: string;
  fields?: {
    name: string;
    value: string;
  }[];
}