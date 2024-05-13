import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { List } from "./entity/List.entity";

@Module({
  imports: [TypeOrmModule.forFeature([List])],
  providers: [ListsService],
  controllers: [ListsController],
  exports: [ListsService]
})
export class ListsModule {}