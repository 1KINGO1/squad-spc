import {
  IsDate, IsNumber,
  IsOptional,
  IsString, Length,
} from "class-validator";

class EditPurchaseDto{
  @IsOptional()
  @IsString()
  @Length(17,17)
  steam_id?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  username?: string;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsNumber()
  listId?: number;

  @IsOptional()
  @IsDate()
  expire_date?: Date;
}

export default EditPurchaseDto;
