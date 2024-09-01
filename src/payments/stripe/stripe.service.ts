import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "../../config/config.service";
import Stripe from "stripe";
import { User } from "../../users/entity/User.entity";
import { PaymentsService } from "../payments.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class StripeService implements OnModuleInit {
  constructor(
    private configService: ConfigService,
    private paymentsService: PaymentsService,
    private usersService: UsersService
  ) {
  }

  private isEnabled = false;
  private stripePrivateKey = null;
  private stripeCurrency = null;
  private stripeWebhookSecret = null;
  private publicKey = null;

  private stripe: Stripe;

  async onModuleInit() {
    const isEnabled = this.configService.get("payment.stripe.enabled") && this.configService.get("payment.general.enabled");
    this.stripePrivateKey = this.configService.get("payment.stripe.privateKey");
    this.stripeCurrency = this.configService.get("payment.stripe.currency");
    this.stripeWebhookSecret = this.configService.get("payment.stripe.webhookSecret");
    this.publicKey = this.configService.get("payment.stripe.publicKey");

    this.isEnabled =
      isEnabled &&
      (this.stripePrivateKey !== null) &&
      (this.stripeCurrency !== null) &&
      (this.stripeWebhookSecret !== null) &&
      (this.publicKey !== null);

    if (this.isEnabled) {
      try {
        this.stripe = new Stripe(this.stripePrivateKey);
        console.log("Stripe connected successfully");
      } catch (e) {
        this.isEnabled = false;
      }
    }
  };

  private isServiceAvailable() {
    if (!this.isEnabled) throw new NotFoundException("Payments using stripe is not configured. Restart the server to apply settings");
  }

  async createPaymentIntent(amount: number, user: User) {
    this.isServiceAvailable();
    if (isNaN(amount) || amount < 0 || amount > 100000000) throw new BadRequestException("Incorrect amount value");

    amount = Math.floor(amount);


    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: this.stripeCurrency,
      metadata: {
        steam_id: user.steam_id
      }
    });
  }

  async updatePaymentIntent(paymentIntentId: string, amount: number, user: User) {
    this.isServiceAvailable();
    if (isNaN(amount) || amount < 0 || amount > 100000000) throw new BadRequestException("Incorrect amount value");

    amount = Math.floor(amount);

    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.metadata["steam_id"] !== user.steam_id) throw new BadRequestException("Payment intent not found");

      return this.stripe.paymentIntents.update(paymentIntentId, {
        amount: amount * 100,
        metadata: {
          steam_id: user.steam_id
        }
      });
    } catch (e) {
      throw new BadRequestException("Payment intent not found");
    }
  }

  async cancelPaymentIntent(paymentIntentId: string, user: User) {
    this.isServiceAvailable();
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.metadata["steam_id"] !== user.steam_id) throw new BadRequestException("Payment intent not found");

      return this.stripe.paymentIntents.cancel(paymentIntentId);
    } catch (e) {
      throw new BadRequestException("Payment intent not found");
    }
  }

  async handleWebhookEvent(signature: string | string[], body: any) {
    this.isServiceAvailable();

    let event;

    try {
      event = this.stripe.webhooks.constructEvent(
        body,
        signature,
        this.stripeWebhookSecret
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const metadata = paymentIntent.metadata;
        const amount = paymentIntent.amount_received;
        const steamID = metadata["steam_id"] as string | undefined;

        if (!steamID) return;

        const user = await this.usersService.findBySteamId(steamID);
        return this.paymentsService.addBalance(user, amount / 100);
      default:
    }
  }
}
