import config from "../config";
import List from "../types/models/List";
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

export async function deleteList(listId: number) {
  const { data } = await axiosWithAuth.delete(config.paths.lists.delete(listId));
  return data
}

interface UpdateListParams{
  listId: number;
  body: Partial<CreateListParams>
}

export async function updateList(params: UpdateListParams): Promise<List> {
  const { data } = await axiosWithAuth.patch(config.paths.lists.update(params.listId), params.body);
  return data
}