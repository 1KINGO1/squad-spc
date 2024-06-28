import config from "../config";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getLists() {
  const { data } = await axiosWithAuth(config.paths.lists.index);
  return data
}

