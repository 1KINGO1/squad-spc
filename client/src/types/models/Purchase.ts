import List from "./List";
import Permission from "./Permission";
import { Product } from "./Product";

export interface Purchase {
  id: number;
  steam_id: string;
  username: string;
  permissions: Permission[];
  product_name: string;
  product_duration: string;
  purchase_price: number;
  isCanceled: boolean;
  create_date: Date;
  expire_date: Date | null;
  cancel_date: Date | null;
  list: List;
  product: Product;
  productId: number;
}