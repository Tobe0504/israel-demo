import { Dispatch, SetStateAction } from "react";

export const activeToggler = (
  index: number | null,
  initState: any,
  setState: Dispatch<SetStateAction<any>>,
  id?: string | number
) => {
  const stateCopy = initState?.map((data: any, i: number) => {
    if (!id) {
      if (i === index) {
        return { ...data, isActive: !data.isActive };
      } else {
        return { ...data, isActive: false };
      }
    } else {
      if (data.id === id) {
        return { ...data, isActive: !data.isActive };
      } else {
        return { ...data, isActive: false };
      }
    }
  });

  setState(stateCopy);
};

export const activeTogglerRestAll = (
  index: number | null,
  initState: any,
  setState: Dispatch<SetStateAction<any>> | undefined,
  id?: string | number
) => {
  const stateCopy = initState.map((data: any, i: number) => {
    if (!id) {
      if (i === index) {
        return { ...data, isActive: !data.isActive };
      } else {
        return { ...data };
      }
    } else {
      if (data.id === id) {
        return { ...data, isActive: !data.isActive };
      } else {
        return { ...data };
      }
    }
  });

  if (setState) {
    setState(stateCopy);
  }
};

export const activeToggleSetAll = (
  initState: any,
  setState: React.Dispatch<React.SetStateAction<any>> | undefined,
  isChecked: boolean
) => {
  const stateCopy = initState.map((data: any) => ({
    ...data,
    isActive: isChecked,
  }));
  if (setState) {
    setState(stateCopy);
  }
};
