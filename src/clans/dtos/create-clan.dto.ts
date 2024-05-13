import {
  IsPositive,
  IsNumber,
  ArrayMinSize,
  MinLength,
  MaxLength, IsNotEmpty, IsOptional
} from "class-validator";
import { AuthRoles } from "../../auth/guards/auth.guard";

export class CreateClanDto {
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @MinLength(1)
  @MaxLength(10)
  tag: string;

  @ArrayMinSize(1)
  @IsNotEmpty()
  @IsPositive({ each: true })
  @IsNumber({}, { each: true })
  allowed_lists: number[];
}