import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getGroups() {
  const { data } = await axiosWithAuth(config.paths.groups.index);
  return data
}