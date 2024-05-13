import {
  IsPositive,
  IsNumber,
  Min, IsOptional
} from "class-validator";

export class CreateLimitDto {
  @IsPositive()
  @IsNumber()
  group_id: number;

  @Min(1)
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number;
}