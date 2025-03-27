import { AxiosError, AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { requestType } from "@/utils/types";
import axiosInstance from "../services/index";

type RequestType = {
  method: string;
  url: string;
  headers?: any;
  data?: any;
  isMultipart?: boolean;
  state?: requestType;
  setState?: Dispatch<SetStateAction<requestType>>;
  successFunction?: (res?: AxiosResponse) => void;
  errorFunction?: (err: AxiosError) => void;
  load?: boolean;
  requestCleanup?: boolean;
  id?: string;
};

export async function requestHandler({
  method,
  url,
  headers,
  data,
  isMultipart,
  setState,
  successFunction,
  errorFunction,
  load,
  requestCleanup,
  id,
}: RequestType) {
  if ((setState && load === true) || (setState && load === undefined)) {
    setState((prevState) => {
      return { ...prevState, isLoading: true, id: id as string };
    });
  } else if (setState && load === false) {
    setState((prevState) => {
      return { ...prevState, isLoading: false, id: id as string };
    });
  }

  axiosInstance({
    method,
    url,
    headers: {
      "Content-Type": !isMultipart ? "application/json" : "multipart/form-data",
      ...headers,
    },
    data,
  })
    .then((res) => {
      if (setState) {
        setState({
          isLoading: false,
          data: res?.data,
          error: null,
          id: id as string,
        });

        if (requestCleanup) {
          setTimeout(() => {
            setState({
              isLoading: false,
              data: null,
              error: null,
              id: id as string,
            });
          }, 5000);
        }
      }
      if (successFunction) {
        successFunction(res);
      }
    })
    .catch((err) => {
      if (setState) {
        setState({
          isLoading: false,
          data: null,
          error: err.response?.data?.message || err?.message,
          id: id as string,
        });

        if (requestCleanup) {
          setTimeout(() => {
            setState({
              isLoading: false,
              data: null,
              error: null,
              id: id as string,
            });
          }, 5000);
        }
      }
      if (errorFunction) {
        errorFunction(err);
      }
    });
}
