import Clan from "./Clan";
import Group from "./Group";

export default interface Limit {
  id: number;
  clan: Clan;
  group: Group;
  limit: number | null;
}