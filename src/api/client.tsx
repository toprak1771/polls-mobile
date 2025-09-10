import { ENV } from "../config/env";
import axios from "axios";

export const api = axios.create({
  baseURL: ENV.baseURL,
  timeout: ENV.timeoutMs,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Something happen error";
    return Promise.reject(new Error(msg));
  }
);