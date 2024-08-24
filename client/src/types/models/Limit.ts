import Group from "./Group";

export default interface Limit {
  id: number;
  clanId: number;
  group: Group;
  limit: number | null;
  create_date: Date;
}