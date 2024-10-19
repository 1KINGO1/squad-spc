import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import { Purchase } from "../types/models/Purchase";

export async function getActivePurchases() {
  const { data } = await axiosWithAuth(config.paths.purchases.active);
  return data
}

export interface CreatePurchaseParams {
  productId: number;
  desiredPrice: number;
}
export async function createPurchase(params: CreatePurchaseParams) {
  const { data } = await axiosWithAuth.post(config.paths.purchases.create(params.productId, params.desiredPrice));
  return data
}

export interface GetAllPurchasesFilters {
  search?: string;
  active?: boolean;
  nolist?: boolean;
  users?: string[];
}
export interface GetAllPurchasesParams extends GetAllPurchasesFilters {
  limit: number;
  offset: number;
}
export interface GetAllPurchasesResponse {
  limit: number,
  page: number,
  pageCount: number,
  purchases: Purchase[],
  total: number,
}
export async function getAllPurchases(params: GetAllPurchasesParams): Promise<GetAllPurchasesResponse> {
  const { data } = await axiosWithAuth(config.paths.purchases.all(params));
  return data
}
