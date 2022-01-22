import axios from "axios";

export const api = axios.create({
  baseURL: "https://school-ads.herokuapp.com",
  withCredentials: true,
});
