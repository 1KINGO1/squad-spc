import User from "./User";

export default interface Clan {
  id: number;
  name: string;
  tag: string;
  created_date: Date;
  allowed_lists?: null[],
  limits?: null[],
  clan_leaders?: User[]
}