import config from "../config";
import Permission from "../types/models/Permission";
import axiosWithAuth from "../utils/axiosWithAuth";

export const getPermissions = async (): Promise<Permission[]> => {
  const { data } = await axiosWithAuth(config.paths.permissions.index);
  return data
}