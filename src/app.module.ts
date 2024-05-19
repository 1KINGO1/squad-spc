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

@Module({
  imports: [
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
  ],
  controllers: [],
})
export class AppModule {
}
