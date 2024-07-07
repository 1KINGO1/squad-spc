import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { RecordsService } from "../records.service";

@Injectable()
export class DeleteExpiredRecordsMiddleware implements NestMiddleware {

  constructor(private recordsService: RecordsService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    await this.recordsService.deleteExpiredRecords();
    next();
  }
}
