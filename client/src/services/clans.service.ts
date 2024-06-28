import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import Clan from "../types/Clans";

export async function getClans(): Promise<Clan[]> {
    const {data} = await axiosWithAuth.get(config.paths.clans.index);
    return data as Clan[];
}

interface UpdateClanArgs {
  id: number
  name?: string;
  tag?: string;
}

export async function updateClan(body: UpdateClanArgs): Promise<Clan> {
    const {data} = await axiosWithAuth.patch(config.paths.clans.update(body.id), {name: body.name, tag: body.tag});
    return data as Clan;
}