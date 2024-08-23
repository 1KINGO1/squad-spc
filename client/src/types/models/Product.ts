import List from "./List";
import Permission from "./Permission";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  permissions: Permission[];
  tag: string | null;
  tagColor: string | null;
  productColor: string | null;
  shouldSale: boolean;
  duration: number | null;
  list: List;
}