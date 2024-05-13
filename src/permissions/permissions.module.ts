import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "./entity/Group.entity";
import { Permission } from "./entity/Permission.entity";
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Permission])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService]
})
export class PermissionsModule {}
