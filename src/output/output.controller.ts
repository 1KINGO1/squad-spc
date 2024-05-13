import { Controller, Get, Param, Res } from "@nestjs/common";
import { OutputService } from "./output.service";
import { Response } from 'express';

@Controller('output')
export class OutputController {
  constructor(private outputService: OutputService) {}

  @Get(':listPath')
  async generateOutput(@Param('listPath') listPath: string, @Res() res: Response) {
    res
      .header('Content-Type', 'text/plain')
      .send(
        await this.outputService.generateOutputByListId(listPath)
      );
  }

}
