import { Module } from '@nestjs/common';
import { OutputService } from './output.service';
import { RecordsModule } from "../records/records.module";
import { OutputController } from './output.controller';
import { PermissionsModule } from "../permissions/permissions.module";
import { PurchasesModule } from "../purchases/purchases.module";

@Module({
  imports: [RecordsModule, PermissionsModule, PurchasesModule],
  providers: [OutputService],
  controllers: [OutputController]
})
export class OutputModule {}
