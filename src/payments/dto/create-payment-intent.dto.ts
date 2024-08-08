import {
 Min, IsInt
} from "class-validator";

export class CreatePaymentIntentDto {
  @IsInt()
  @Min(0)
  amount: number;
}