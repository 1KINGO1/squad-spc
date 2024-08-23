import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ListsModule } from './lists/lists.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ClansModule } from './clans/clans.module';
import { RecordsModule } from './records/records.module';
import { OutputModule } from './output/output.module';
import { LoggerModule } from './logger/logger.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { DatabaseSeedModule } from "./database-seed/database-seed.module";
import { ConfigModule } from './config/config.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';

import * as path from "path";
import dbConfig from "./db.config";


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'build'),
    }),
    TypeOrmModule.forRoot(dbConfig),
    UsersModule,
    AuthModule,
    ListsModule,
    PermissionsModule,
    DatabaseSeedModule,
    ClansModule,
    RecordsModule,
    OutputModule,
    LoggerModule,
    ConfigModule,
    PaymentsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
