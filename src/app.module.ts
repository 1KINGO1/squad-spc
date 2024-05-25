import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entity/User.entity";
import { ListsModule } from './lists/lists.module';
import { List } from "./lists/entity/List.entity";
import { PermissionsModule } from './permissions/permissions.module';
import { Group } from "./permissions/entity/Group.entity";
import { Permission } from "./permissions/entity/Permission.entity";
import { ClansModule } from './clans/clans.module';
import { Clan } from "./clans/entity/Clan.entity";
import { DatabaseSeedModule } from './database-seed/database-seed.module';
import { RecordsModule } from './records/records.module';
import { Record } from "./records/entity/Record.entity";
import { Limit } from "./clans/entity/Limit.entity";
import { OutputModule } from './output/output.module';
import { LoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggerInterceptor } from "./logger/logger.interceptor";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'build'),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5050,
      username: "admin",
      password: "admin",
      database: "spc",
      entities: [User, List, Permission, Group, Clan, Record, Limit],
      synchronize: process.env.NODE_ENV === 'development'
    }),
    UsersModule,
    AuthModule,
    ListsModule,
    PermissionsModule,
    ClansModule,
    DatabaseSeedModule,
    RecordsModule,
    OutputModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
}
