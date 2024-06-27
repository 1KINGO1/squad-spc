import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import Clan from "../types/Clans";

export async function getClans(): Promise<Clan[]> {
    const {data} = await axiosWithAuth.get(config.paths.clans.index);
    return data as Clan[];
  }
