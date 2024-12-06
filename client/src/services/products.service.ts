import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import { Product } from "../types/models/Product";

export async function getProducts(): Promise<Product[]> {
  const { data } = await axiosWithAuth(config.paths.products.index);
  return data as Product[];
}

interface CreateProductParams{
  name: string;
  description: string;
  price: number;
  permissions: number[];
  tag?: string | null;
  tagColor?: string | null;
  productColor?: string | null;
  listId: number;
  duration?: number | null;
}
export async function createProduct(params: CreateProductParams){
  const { data } = await axiosWithAuth.post(config.paths.products.create, params);
  return data;
}

interface UpdateProductParams extends Partial<CreateProductParams>
{
  id: number;
  shouldSale?: boolean;
}

export async function updateProduct(params: UpdateProductParams){
  const { data } = await axiosWithAuth.patch(config.paths.products.update(params.id), params);
  return data;
}

interface DeleteProductParams {
  id: number;
}

export async function deleteProduct({ id } : DeleteProductParams){
  const { data } = await axiosWithAuth.delete(config.paths.products.delete(id));
  return data;
}
