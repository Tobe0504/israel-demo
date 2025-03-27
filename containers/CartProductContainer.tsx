import CustomButton from "@/components/CustomButton";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import { generateImageURL } from "@/helpers/generateImageURL";
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from "@/utils/constants";
import { cartItemType, productType } from "@/utils/types";
import React from "react";
import { TextInput } from "react-native";
import { Button, Image, View } from "react-native";
import { getProductById } from "@/services/services";
import CartItem from "./CartItem";

type CartProductContainerType = {
  data: cartItemType[];
  request?: () => void;
};

const CartProductContainer = ({ data, request }: CartProductContainerType) => {
  return (
    <>
      {data?.map((cartItem: cartItemType, i: number) => {
        return (
          <CartItem data={cartItem} key={i} request={request && request} />
        );
      })}
    </>
  );
};

export default CartProductContainer;
