import axiosInstance from ".";
import Constants from "expo-constants";

import {
  productCategoriesRequestDataType,
  productType,
  Response,
} from "@/utils/types";
import axios, { AxiosResponse } from "axios";

// Utilities
const { paystack_secret_key, flutterwave_secret_key }: any =
  Constants?.expoConfig?.extra;

export const getProductById = (
  id: string
): Promise<AxiosResponse<productType>> => {
  return axiosInstance.get<productType>(
    `api/product/getSingleProduct?Id=${id}`
  );
};

export const verifyTransaction = (
  reference: string
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${paystack_secret_key}`,
      },
    }
  );
};

export const verifyFlutterwaveTransaction = (
  reference: string
): Promise<AxiosResponse<any>> => {
  return axios.get<any>(
    `https://api.flutterwave.com/v3/transactions/${reference}/verify`,
    {
      headers: {
        Authorization: `Bearer ${flutterwave_secret_key}`,
      },
    }
  );
};
