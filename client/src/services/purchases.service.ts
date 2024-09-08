import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";

export async function getActivePurchases() {
  const { data } = await axiosWithAuth(config.paths.purchases.active);
  return data
}

interface CreatePurchaseParams {
  productId: number;
  desiredPrice: number;
}

export async function createPurchase(params: CreatePurchaseParams) {
  const { data } = await axiosWithAuth.post(config.paths.purchases.create(params.productId, params.desiredPrice));
  return data
}