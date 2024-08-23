import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({},{each: true})
  permissions: number[];

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  tag: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(8)
  tagColor: string;

  @IsOptional()
  @MinLength(1)
  @MaxLength(8)
  productColor: string;

  @IsNotEmpty()
  @IsInt()
  listId: number;
}