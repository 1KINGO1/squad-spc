import config from "./config";

import { User } from "./users/entity/User.entity";
import { List } from "./lists/entity/List.entity";
import { Permission } from "./permissions/entity/Permission.entity";
import { Group } from "./permissions/entity/Group.entity";
import { Clan } from "./clans/entity/Clan.entity";
import { Record } from "./records/entity/Record.entity";
import { Limit } from "./clans/entity/Limit.entity";

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";

export default {
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, List, Permission, Group, Clan, Record, Limit],
  synchronize: true, // TODO: Refactor with migrations
} as TypeOrmModuleOptions & DataSourceOptions