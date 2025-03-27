import axiosInstance from ".";
import {
  productCategoriesRequestDataType,
  productType,
  Response,
} from "@/utils/types";
import { AxiosResponse } from "axios";

export const getProductById = (
  id: string
): Promise<AxiosResponse<productType>> => {
  return axiosInstance.get<productType>(
    `api/product/getSingleProduct?Id=${id}`
  );
};
