import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import Permission from "../types/models/Permission";

export const getPermissions = async (): Promise<Permission[]> => {
  const { data } = await axiosWithAuth(config.paths.permissions.index);
  return data
}