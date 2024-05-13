import {
  IsPositive,
  IsNumber,
  Min,
  IsOptional
} from "class-validator";

export class UpdateLimitDto {
  @Min(1)
  @IsPositive()
  @IsNumber()
  @IsOptional()
  limit?: number;
}