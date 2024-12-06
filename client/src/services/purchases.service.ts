import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import { Purchase } from "../types/models/Purchase";
import { IsDate, IsNumber, IsOptional, IsString, Length } from "class-validator";

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


export async function activatePurchase(purchaseId: number) {
  const { data } = await axiosWithAuth.patch(config.paths.purchases.activate(purchaseId));
  return data
}
export async function deactivatePurchase(purchaseId: number) {
  const { data } = await axiosWithAuth.patch(config.paths.purchases.deactivate(purchaseId));
  return data
}

interface EditPurchases{
  purchaseId: number,
  steam_id?: string,
  username?: string,
  productId?: number,
  listId?: number,
  expire_date?: number,
}
export async function updatePurchase(body: EditPurchases) {
  const { data } = await axiosWithAuth.patch(config.paths.purchases.edit(body.purchaseId), body);
  return data
}
