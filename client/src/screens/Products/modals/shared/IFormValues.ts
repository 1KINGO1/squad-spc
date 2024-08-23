import { ColorFactory } from "antd/es/color-picker/color";

export interface IFormValues {
  name: string,
  description: string,
  price: number;
  permissions: string[];
  tag: string | null;
  tagColor: ColorFactory | null;
  productColor: ColorFactory | null;
  duration: { value: number | null, unit: number };
}