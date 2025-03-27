import Constants from "expo-constants";

const { backendBaseUrl, productionBackendBaseUrl }: any =
  Constants?.expoConfig?.extra;

export const BACKEND_API_URL = backendBaseUrl;
export const PRODUCTION_BACKEND_API_URL = productionBackendBaseUrl;
