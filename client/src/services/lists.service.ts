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

interface CreateListParams {
  name: string;
  path: string;
}
export async function createList(createParams: CreateListParams) {
  const { data } = await axiosWithAuth.post(config.paths.lists.create, createParams);
  return data
}