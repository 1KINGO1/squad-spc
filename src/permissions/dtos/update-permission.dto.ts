import { IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdatePermissionDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  value?: string;
}