import axios from "axios";

/* "https://school-ads.herokuapp.com"; */

export const api = axios.create({
  baseURL: "http://localhost:3001",
});
