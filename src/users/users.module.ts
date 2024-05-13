import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from "./entity/User.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import { ClansModule } from "../clans/clans.module";
import { DatabaseSeedModule } from "../database-seed/database-seed.module";

@Module({
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), ClansModule, DatabaseSeedModule],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
