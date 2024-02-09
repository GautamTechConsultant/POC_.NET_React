import axios from "axios";

export const AxiosBase = axios.create({
  baseURL: "https://r0drg8x8-7058.inc1.devtunnels.ms",
  headers: {
    "Content-Type": "application/json",
  },
});
