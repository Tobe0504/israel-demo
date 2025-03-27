import { modalGenericType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";

export const setAllModalsFalse = (
  setState: Dispatch<SetStateAction<{ [key: string]: boolean }>>
) => [
  setState((prevState: { [key: string]: boolean }) => {
    const newMapped = Object.keys(prevState).reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {} as { [key: string]: boolean });

    return newMapped;
  }),
];

export const setModalTrue = (
  setState: Dispatch<SetStateAction<modalGenericType>>,
  prop: string
) => {
  setState((prevState) => {
    const updatedState = { ...prevState };
    updatedState[prop] = true;
    return updatedState;
  });
};
