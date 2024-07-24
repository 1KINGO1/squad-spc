import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";
import User, { UserWithClans } from "../types/models/User";

interface GetUsersParams {
  limit: number,
  order: {
    by: "ASC" | "DESC";
    field: string;
  }
}
export async function getUsers(params: GetUsersParams): Promise<User> {
  const { data } = await axiosWithAuth(config.paths.users.index(params.limit, params.order.by, params.order.field));
  return data
}

interface UpdateUserPermissionParams {
  id: number;
  permission: number;
}
export async function updateUserPermission(params: UpdateUserPermissionParams): Promise<User> {
  const { data } = await axiosWithAuth.patch(config.paths.users.update(params.id), {
    permission: params.permission
  });
  return data
}

interface UpdateUserClansParams {
  id: number;
  clan_ids: number[];
}
export async function updateUserClans(params: UpdateUserClansParams): Promise<UserWithClans> {
  const { data } = await axiosWithAuth.patch(config.paths.users.update(params.id), {
    clan_ids: params.clan_ids
  });
  return data
}