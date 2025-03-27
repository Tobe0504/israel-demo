import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import NetInfo from "@react-native-community/netinfo";
import { BACKEND_API_URL } from "../config/index";
import { LOCAL_STORAGE_AUTH_KEY_NAME } from "../utils/constants";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";

const getTokenAsync = async (): Promise<string | null> => {
  try {
    const token = await getAsyncData(LOCAL_STORAGE_AUTH_KEY_NAME);
    return token as string;
  } catch (error) {
    console.error("Error retrieving token", error);
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (axiosConfig: any) => {
    const state = await NetInfo.fetch();
    if (!state.isConnected) {
      return Promise.reject(new Error("Please check your internet connection"));
    }

    const token = await getTokenAsync();
    if (token) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    } else {
      return Promise.reject(
        new Error(response.data?.error?.message || "An error occurred")
      );
    }
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
