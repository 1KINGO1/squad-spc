import PaginationDto from "../../core/queries-dto/pagination.dto";
import {
  ArrayMaxSize, ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";
import { Transform } from "class-transformer";

class GetAllPurchasesDto extends PaginationDto{
  @IsOptional()
  @IsString()
  @MaxLength(100)
  public search?: string;

  @IsOptional()
  @Transform(({ obj, key }) => obj[key] === 'true')
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @Transform(({ obj, key }) => obj[key] === 'true')
  @IsBoolean()
  nolist: boolean;

  @IsOptional()
  @Transform(({value}) => value.split(","))
  @IsArray()
  @ArrayMaxSize(25)
  @ArrayMinSize(1)
  users: string[];
}

export default GetAllPurchasesDto;
