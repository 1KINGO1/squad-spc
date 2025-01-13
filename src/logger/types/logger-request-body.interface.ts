import { LoggerLevel } from "./logger-level.enum";
import { User } from "../../users/entity/User.entity";

export enum LoggerEntity {
  User = "user",
  Clan = "clan",
  Config = "config",
  List = "list",
  Logger = "logger",
  Output = "output",
  Permission = "permission",
  Record = "record",
  Product = "product",
  Purchase = "purchase",
  PurchaseThanks = "purchaseThanks",
}

export interface LoggerRequestBody{
  entity: LoggerEntity
  title?: string;
  message?: string;
  level: LoggerLevel;
  user?: User;
  image_url?: string;
  fields?: {
    name: string;
    value: string;
  }[];
}
