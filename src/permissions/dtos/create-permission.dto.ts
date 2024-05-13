import { IsNotEmpty,IsOptional, MaxLength, MinLength } from "class-validator";

export class CreatePermissionDto {
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @MinLength(3)
  @MaxLength(50)
  value: string;
}