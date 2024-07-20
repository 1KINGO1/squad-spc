import config from "../config";
import Group from "../types/models/Group";
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

export async function deleteGroup(id: number){
  const {data} = await axiosWithAuth.delete(config.paths.groups.delete(id));
  return data;
}

interface CreateGroupParams{
  name: string;
  permissions: number[]
}
export async function createGroup(params: CreateGroupParams): Promise<Group>{
  const {data} = await axiosWithAuth.post(config.paths.groups.create, params);
  return data;
}