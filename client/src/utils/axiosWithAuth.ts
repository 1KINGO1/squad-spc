import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  }
});