import Clan from "./Clan";

export default interface List {
  id: number,
  name: string,
  path: string,
  clans?: Clan[],
  create_date: Date
}