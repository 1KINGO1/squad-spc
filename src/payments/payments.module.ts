import { Module } from '@nestjs/common';
import { StripeService } from './stripe/stripe.service';
import { PaymentsService } from './payments.service';
import { StripeController } from './stripe/stripe.controller';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Balance } from "./entity/Balance.entity";
import { UsersModule } from "../users/users.module";
import { ConfigModule } from "../config/config.module";

@Module({
  providers: [StripeService, PaymentsService],
  controllers: [StripeController, PaymentsController],
  imports: [ConfigModule, UsersModule, TypeOrmModule.forFeature([Balance])],
  exports: [PaymentsService]
})
export class PaymentsModule {}
