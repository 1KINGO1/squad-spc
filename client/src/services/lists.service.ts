import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getLists() {
  const { data } = await axiosWithAuth(config.paths.lists.index);
  return data
}

export async function getListClans(listId: number) {
  const { data } = await axiosWithAuth(config.paths.lists.clans(listId));
  return data
}