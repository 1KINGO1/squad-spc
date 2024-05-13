import { Module } from '@nestjs/common';
import { DatabaseSeedService } from './database-seed.service';
import { ClansModule } from "../clans/clans.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { ListsModule } from "../lists/lists.module";

@Module({
  providers: [DatabaseSeedService],
  imports: [PermissionsModule, ClansModule, ListsModule],
  exports: [DatabaseSeedService]
})
export class DatabaseSeedModule {}
