import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const serverData = error.response?.data as any;

    const formattedError: ApiError = {
      error:
        serverData?.error ||
        (error.code === "ERR_NETWORK" ? "NETWORK_ERROR" : "UNKNOWN_ERROR"),
      message:
        serverData?.message || error.message || "An unexpected error occurred",
      statusCode: serverData?.statusCode || error.response?.status || 500,
    };

    return Promise.reject(formattedError);
  }
);
