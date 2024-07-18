import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getGroups() {
  const { data } = await axiosWithAuth(config.paths.groups.index);
  return data
}

interface UpdateGroupParams{
  id: number;
  name?: string;
  permissions?: number[]
}

export async function updateGroup(params: UpdateGroupParams){
  const {data} = await axiosWithAuth.patch(config.paths.groups.update(params.id), {
    name: params.name ?? undefined,
    permissions: params.permissions ?? undefined
  });
  return data;
}