import { Body, Controller, Delete, Param, Patch, Post, RawBodyRequest, Req } from "@nestjs/common";
import { Request } from "express";
import { StripeService } from "./stripe.service";
import { CreatePaymentIntentDto } from "../dto/create-payment-intent.dto";
import { UpdatePaymentIntentDto } from "../dto/update-payment-intent.dto";

@Controller('payments/stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post('webhook')
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
  ) {
    const sig = req.headers['stripe-signature'];
    return this.stripeService.handleWebhookEvent(sig, req.rawBody);
  }

  @Post('payment-intent')
  async createPaymentIntent(@Body() body: CreatePaymentIntentDto, @Req() req: Express.Request) {
    return this.stripeService.createPaymentIntent(body.amount, req.user);
  }

  @Patch('payment-intent')
  async updatePaymentIntent(@Body() body: UpdatePaymentIntentDto, @Req() req: Express.Request) {
    return this.stripeService.updatePaymentIntent(body.paymentIntentId, body.amount, req.user);
  }

  @Delete('payment-intent/:paymentIntentId')
  async cancelPaymentIntent(@Param('paymentIntentId') paymentIntentId: string, @Req() req: Express.Request) {
    return this.stripeService.cancelPaymentIntent(paymentIntentId, req.user);
  }
}
