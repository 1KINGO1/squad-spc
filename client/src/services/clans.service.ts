import config from "../config";
import Clan from "../types/models/Clan";
import Limit from "../types/models/Limit";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getClans(): Promise<Clan[]> {
    const {data} = await axiosWithAuth.get(config.paths.clans.index + `?include=allowed_lists,clan_leaders`);
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

interface GetClanLimitsArgs {
  clanId: number;
}
export async function getClanLimits({clanId}: GetClanLimitsArgs) {
  const {data} = await axiosWithAuth.get(config.paths.clans.limits(clanId));
  return data;
}

export async function replaceClanLimits(clanId: number, limits: {group_id: number, limit: number | null}[]): Promise<Limit[]> {
  const {data} = await axiosWithAuth.post(config.paths.clans.limitsReplace(clanId), limits);
  return data as Limit[];
}

export async function deleteClan(clanId: number) {
  const {data} = await axiosWithAuth.delete(config.paths.clans.delete(clanId));
  return data;
}