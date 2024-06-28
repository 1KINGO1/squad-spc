import Limit from "./Limit";
import List from "./List";
import User from "./User";

export default interface Clan {
  id: number;
  name: string;
  tag: string;
  created_date: Date;
  allowed_lists?: List[],
  limits?: Limit[],
  clan_leaders?: User[]
}