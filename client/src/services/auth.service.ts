import axiosWithAuth from "../utils/axiosWithAuth";
import User from "../types/User";

export default {
  async getUserInfo(){

    return new Promise<{user: User | null, status: number}>( (resolve, reject) => {
      axiosWithAuth.get("http://localhost:3000/api/auth/me")
        .then( (response) => {
          resolve({ user: response.data, status: response.status });
        })
        .catch( (error) => {
          reject({ status: error.response.status, user: null });
        });
    })

  }
}