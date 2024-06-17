import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

instance.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await instance.post("/auth/refresh-token");
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
