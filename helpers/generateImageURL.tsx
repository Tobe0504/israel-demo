import { BACKEND_API_URL, PRODUCTION_BACKEND_API_URL } from "@/config";

export const generateImageURL = (path: string) => {
  return `${PRODUCTION_BACKEND_API_URL}/${path}`;
};
