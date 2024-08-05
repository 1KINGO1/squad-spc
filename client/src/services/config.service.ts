import axiosWithAuth from "../utils/axiosWithAuth";
import config from "../config";
import { ConfigSettings } from "../types/models/ConfigSettings";

export const getConfigSettings = async () => {
  const {data} = await axiosWithAuth.get(config.paths.config.settings);
  return data as ConfigSettings;
}

export const getConfig = async () => {
  const {data} = await axiosWithAuth.get(config.paths.config.index);
  return data;
}

interface UpdateConfigPropertyParams {
  key: string;
  value: any;
}
export const updateConfigProperty = async ({key, value}: UpdateConfigPropertyParams): Promise<{[key: string]: any}> => {
  const {data} = await axiosWithAuth.put(config.paths.config.changeProperty(key), {value});
  return data as {[key: string]: any};
}