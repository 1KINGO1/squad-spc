import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import { Patch } from "@nestjs/common";
import Balance from "../types/models/Balance";

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

export const getBalance = async (): Promise<Balance> => {
  const { data } = await axiosWithAuth.get(config.paths.payments.balance);
  return data;
}

export const getUserBalance = async (steamId: string): Promise<Balance> => {
  const { data } = await axiosWithAuth.get(config.paths.payments.userBalance(steamId));
  return data;
}

interface UpdateUserBalanceParams {
  steamId: string;
  amount: number;
  currentBalance: number;
}
export const updateUserBalance = async ({ steamId, amount, currentBalance }: UpdateUserBalanceParams): Promise<Balance> => {
  const { data } = await axiosWithAuth.patch(config.paths.payments.updateUserBalance(steamId), {
    amount, currentBalance
  });
  return data;
}
