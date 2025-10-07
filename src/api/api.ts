import axios from "axios";
import { env } from "../config/env";
import type { ApiError } from "../types/error";

export const api = axios.create({
  baseURL: env.apiBaseUrl ?? "http://localhost:5196",
  timeout: 15000,
});

api.interceptors.response.use(
  (resp) => resp,
  (err) => {
    const data = err?.response?.data as ApiError | undefined;
    if (data?.code && data?.message) return Promise.reject(data);
    return Promise.reject({
      code: "NETWORK_ERROR",
      message: err?.message ?? "Network error",
      correlationId: "-",
    } as ApiError);
  }
);
