import { useState } from "react";
import * as paymentService from "../../services/payments.service";

const usePaymentIntent = () => {
  const [paymentIntent, setPaymentIntent] = useState<{id: string, client_secret: string} | null>(null);

  const createPaymentIntent = async (amount: number) => {
    const data = await paymentService.createPaymentIntent(amount);
    setPaymentIntent(data);
  }

  const updatePaymentIntent = async (amount: number) => {
    if (paymentIntent === null) {
      throw new Error("Create payment intent first");
    }
    await paymentService.updatePaymentIntent(amount, paymentIntent.id);
  }

  const cancelPaymentIntent = async () => {
    if (paymentIntent === null) {
      throw new Error("Create payment intent first");
    }

    await paymentService.deletePaymentIntent(paymentIntent.id);
    setPaymentIntent(null);
  }

  return {
    createPaymentIntent,
    updatePaymentIntent,
    cancelPaymentIntent,
    paymentIntent
  }
}

export default usePaymentIntent;