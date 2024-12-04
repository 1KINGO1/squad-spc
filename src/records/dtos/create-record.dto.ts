import {
  MinLength,
  MaxLength,
  Length,
  IsOptional, IsPositive, IsNumber,
  IsDate, MinDate
} from "class-validator";
import { Type } from "class-transformer";

export class CreateRecordDto {
  @MinLength(1)
  @MaxLength(100)
  username: string;

  @Length(17, 17)
  steam_id: string;

  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  expire_date?: Date;

  @IsPositive()
  @IsNumber()
  group_id: number;

}
