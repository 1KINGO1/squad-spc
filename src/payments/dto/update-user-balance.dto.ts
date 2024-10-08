import { IsInt, IsNotEmpty, Min } from "class-validator";

export class UpdateUserBalanceDto {
  @IsInt()
  @Min(0)
  amount: number;

  @IsInt()
  @IsNotEmpty()
  currentBalance: number;
}
