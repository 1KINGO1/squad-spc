import { IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateGroupDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @IsNumber({},{each: true})
  @IsOptional()
  permissions?: number[];
}