import {
  MinLength,
  MaxLength,
  Length,
  isDate, IsDate, IsOptional, IsPositive, IsNumber
} from "class-validator";

export class CreateRecordDto {
  @MinLength(1)
  @MaxLength(100)
  username: string;

  @Length(17, 17)
  steam_id: string;

  @IsDate()
  @IsOptional()
  expire_date?: Date;

  @IsPositive()
  @IsNumber()
  groupId: number;

}