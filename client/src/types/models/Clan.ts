import List from "./List";

export default interface Clan {
  id: number;
  name: string;
  tag: string;
  created_date: Date;
  // ids of lists
  allowed_lists: List[],
  //limits?: Limit[],
  //clan_leaders?: User[]
}