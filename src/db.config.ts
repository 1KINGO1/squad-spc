import config from "./config";

import { User } from "./users/entity/User.entity";
import { List } from "./lists/entity/List.entity";
import { Permission } from "./permissions/entity/Permission.entity";
import { Group } from "./permissions/entity/Group.entity";
import { Clan } from "./clans/entity/Clan.entity";
import { Record } from "./records/entity/Record.entity";
import { Limit } from "./clans/entity/Limit.entity";
import { Balance } from "./payments/entity/Balance.entity";

import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { Setup1723306542359 } from "./migrations/1723306542359-Setup";

console.log("DB Synchronize", process.env.NODE_ENV !== 'production');
console.log("DB MigrationsRun", process.env.NODE_ENV === 'production');

export default {
  type: "postgres",
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [User, List, Permission, Group, Clan, Record, Limit, Balance],
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  migrationsTableName: "migrations",
  migrations: [Setup1723306542359],
} as TypeOrmModuleOptions & DataSourceOptions