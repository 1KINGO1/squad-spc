import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";

export const createPaymentIntent = async (amount: number) => {
  const { data } = await axiosWithAuth.post(config.paths.payments.create, {
    amount: amount
  });

  return data;
}

export const updatePaymentIntent = async (amount: number, paymentIntentId: string) => {
  const { data } = await axiosWithAuth.patch(config.paths.payments.update, {
    amount: amount,
    paymentIntentId: paymentIntentId
  });

  return data;
}

export const deletePaymentIntent = async (paymentIntentId: string) => {
  const { data } = await axiosWithAuth.delete(config.paths.payments.delete(paymentIntentId));
  return data;
}

export const getBalance = async (): Promise<{balance: number}> => {
  const { data } = await axiosWithAuth.get(config.paths.payments.balance);
  return data;
}