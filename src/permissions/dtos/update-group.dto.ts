import { ArrayMaxSize, ArrayMinSize, IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";

export class UpdateGroupDto {
  @MinLength(3)
  @MaxLength(50)
  @IsOptional()
  name?: string;

  @IsNumber({},{each: true})
  @ArrayMinSize(1)
  @ArrayMaxSize(25)
  @IsOptional()
  permissions?: number[];
}