import Clan from "./Clans";
import Group from "./Group";

export default interface Limit {
  id: number;
  clan: Clan;
  group: Group;
  limit: number | null;
}