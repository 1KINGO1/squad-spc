import { IsNotEmpty, MaxLength,MinLength } from "class-validator";

export class CreateListDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  path: string;
}