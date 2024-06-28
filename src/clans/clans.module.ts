import { forwardRef, Module } from "@nestjs/common";
import { ClansService } from './clans.service';
import { ClansController } from './clans.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clan } from "./entity/Clan.entity";
import { PermissionsModule } from "../permissions/permissions.module";
import { ListsModule } from "../lists/lists.module";
import { Limit } from "./entity/Limit.entity";
import { LimitsService } from './limits/limits.service';
import { LimitsController } from './limits/limits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clan, Limit]), PermissionsModule, forwardRef(() => ListsModule)],
  providers: [ClansService, LimitsService],
  controllers: [ClansController, LimitsController],
  exports: [ClansService]
})
export class ClansModule {}
