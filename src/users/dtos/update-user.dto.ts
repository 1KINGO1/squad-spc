import { IsNotEmpty, IsPositive, IsNumber, Min, Max, ArrayMinSize, IsOptional } from "class-validator";
import { AuthRoles } from "../../auth/guards/auth.guard";

export class UpdateUserDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  permission?: AuthRoles;

  @ArrayMinSize(1)
  @IsPositive({ each: true })
  @IsNumber({}, { each: true })
  @IsOptional()
  clan_ids?: number[];
}