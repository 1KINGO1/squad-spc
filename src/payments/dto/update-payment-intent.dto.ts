import {
  Min, IsInt, IsNotEmpty
} from "class-validator";

export class UpdatePaymentIntentDto {
  @IsInt()
  @Min(0)
  amount: number;

  @IsNotEmpty()
  paymentIntentId: string;
}