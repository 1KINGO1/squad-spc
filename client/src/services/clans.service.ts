import config from "../config";
import Clan from "../types/models/Clan";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getClans(): Promise<Clan[]> {
    const {data} = await axiosWithAuth.get(config.paths.clans.index + `?include=allowed_lists`);
    return data as Clan[];
}

interface UpdateClanArgs {
  id: number
  name?: string;
  tag?: string;
  allowed_lists?: number[];
}
export async function updateClan(body: UpdateClanArgs): Promise<Clan> {
    const {data} = await axiosWithAuth.patch(
      config.paths.clans.update(body.id),
      {name: body.name, tag: body.tag, allowed_lists: body.allowed_lists}
    );
    return data as Clan;
}

interface CreateClanArgs {
  name: string;
  tag: string;
  allowed_lists?: number[];
}
export async function createClan(body: CreateClanArgs): Promise<Clan> {
    const {data} = await axiosWithAuth.post(config.paths.clans.create, {
      name: body.name,
      tag: body.tag,
      allowed_lists: body.allowed_lists || []
    });
    return data as Clan;
}