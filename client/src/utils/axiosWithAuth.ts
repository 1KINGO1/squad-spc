import axios from "axios";
import Cookies from "js-cookie";

import config from "../config";
import convertCreateDateToJSDate from "./convertCreateDateToJSDate";

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`
  },
  baseURL: config.apiBaseUrl
});

instance.interceptors.response.use(response => {
  convertCreateDateToJSDate(response.data);
  return response;
}, error => {
  return Promise.reject(error);
});

export default instance;