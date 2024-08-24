import Permission from "./Permission";

export default interface Group {
  id: number;
  name: string;
  permissions: Permission[];
  create_date: Date;
}