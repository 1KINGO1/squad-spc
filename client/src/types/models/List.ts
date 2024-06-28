import Clan from "./Clans";

export default interface List {
  id: number,
  name: string,
  path: string,
  clans?: Clan[]
}