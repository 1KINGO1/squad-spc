import axios from "axios";
import Cookies from "js-cookie";
import config from "../config";

export default axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
  baseURL: config.apiBaseUrl
});