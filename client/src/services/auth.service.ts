import config from "../config";
import User from "../types/models/User";
import axiosWithAuth from "../utils/axiosWithAuth";

export async function getUserInfo() {

  return new Promise<{ user: User | null, status: number }>((resolve, reject) => {
    axiosWithAuth.get(config.paths.auth.me)
      .then((response) => {
        resolve({ user: response.data, status: response.status });
      })
      .catch((error) => {
        reject({ status: error.response.status, user: null });
      });
  });

}