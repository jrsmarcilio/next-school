import Cookie from "js-cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://school-ads.herokuapp.com",
  withCredentials: true,
  headers: {
    Cookie: `connect.sid=${Cookie.get("connect.sid")}`,
  },
});
