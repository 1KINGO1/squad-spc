import Clan from "./Clan";
import { Roles } from "../Roles";

export default interface User {
  id: number;
  username: string;
  avatar_url: string;
  steam_id: string;
  discord_id: string | null;
  permission: Roles;
}

export interface UserWithClans extends User {
  clans: Clan[];
}