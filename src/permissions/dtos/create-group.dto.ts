import { MaxLength, MinLength, IsNumber, ArrayMaxSize, ArrayMinSize } from "class-validator";

export class CreateGroupDto {
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNumber({},{each: true})
  @ArrayMaxSize(25)
  @ArrayMinSize(1)
  permissions: number[];
}