import { forwardRef, Module } from "@nestjs/common";
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from "./entity/List.entity";
import { ClansModule } from "../clans/clans.module";

@Module({
  imports: [TypeOrmModule.forFeature([List]), forwardRef(() => ClansModule)],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService]
})
export class ListsModule {}
