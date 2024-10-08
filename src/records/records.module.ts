import { MiddlewareConsumer, Module } from "@nestjs/common";
import { RecordsService } from "./records.service";
import { RecordsController } from "./records.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Record } from "./entity/Record.entity";
import { ClansModule } from "../clans/clans.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { ListsModule } from "../lists/lists.module";
import { DeleteExpiredRecordsMiddleware } from "./middlewares/delete.expired.records.middleware";

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    ClansModule,
    PermissionsModule,
    ListsModule
  ],
  providers: [RecordsService],
  controllers: [RecordsController],
  exports: [RecordsService]
})
export class RecordsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(DeleteExpiredRecordsMiddleware)
      .forRoutes("records", "output");
  }
}
