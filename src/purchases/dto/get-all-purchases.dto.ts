import PaginationDto from "../../core/queries-dto/pagination.dto";
import {
  ArrayMaxSize, ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
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
}

export default GetAllPurchasesDto;
