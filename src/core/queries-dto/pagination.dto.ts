import { IsInt, IsOptional, Max, Min } from "class-validator";

class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number;
}

export default PaginationDto;
