import { IsNotEmpty,IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateListDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string | null;

  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  path?: string | null;
}