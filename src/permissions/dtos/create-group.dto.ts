import { MaxLength, MinLength, IsNumber, ArrayMaxSize } from "class-validator";

export class CreateGroupDto {
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNumber({},{each: true})
  @ArrayMaxSize(25)
  permissions: number[];
}