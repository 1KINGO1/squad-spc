import {
  IsPositive,
  IsNumber,
  ArrayMinSize,
  MinLength,
  MaxLength, IsNotEmpty, IsOptional
} from "class-validator";
import { AuthRoles } from "../../auth/guards/auth.guard";

export class UpdateClanDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name: string;

  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  tag: string;

  @ArrayMinSize(1)
  @IsNotEmpty()
  @IsPositive({ each: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  allowed_lists: number[];
}