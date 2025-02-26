import axios from "axios";
import { AuthResponce } from "../models/responce/AuthResponce";

export const API_URL = "http://localhost:8000";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.responce?.status;
    if (statusCode == 401 && error.config && !error.config._isRetry == true) {
      originalRequest._isRetry = true;
      try {
        const responce = await axios.get<AuthResponce>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", responce.data.access_token);
        return $api.request(originalRequest);
      } catch {
        console.log("Пользователь не авторизован");
      }
    }
    throw error;
  }
);

export default $api;
