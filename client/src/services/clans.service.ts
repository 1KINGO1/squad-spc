import config from "../config";
import Clan from "../types/models/Clans";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getClans(): Promise<Clan[]> {
    const {data} = await axiosWithAuth.get(config.paths.clans.index + `?include=clan_leaders,allowed_lists,limits`);
    return data as Clan[];
}

interface UpdateClanArgs {
  id: number
  name?: string;
  tag?: string;
}

export async function updateClan(body: UpdateClanArgs): Promise<Clan> {
    const {data} = await axiosWithAuth.patch(
      config.paths.clans.update(body.id),
      {name: body.name, tag: body.tag}
    );
    return data as Clan;
}