import {
  ArrayNotEmpty,
  IsArray, IsBoolean,
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

export class UpdateProductDto {
  @IsOptional()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsOptional()
  @IsBoolean()
  shouldSale: boolean;

  @IsOptional()
  @MinLength(1)
  @MaxLength(500)
  description: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  price: number;

  @IsOptional()
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
}