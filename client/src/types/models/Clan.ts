import List from "./List";
import User from "./User";

export default interface Clan {
  id: number;
  name: string;
  tag: string;
  create_date: Date;
  allowed_lists: List[],
  clan_leaders: User[],
}