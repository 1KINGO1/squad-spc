import { Module } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { PaymentsService } from './payments.service';
import { StripeController } from './stripe/stripe.controller';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./entity/Balance.entity";
import { UsersModule } from "../users/users.module";

@Module({
  providers: [StripeService, PaymentsService],
  controllers: [StripeController, PaymentsController],
  imports: [UsersModule, TypeOrmModule.forFeature([Balance])]
})
export class PaymentsModule {}
