import { cartItemType } from "@/utils/types";
import { Dispatch, SetStateAction } from "react";

import CartItem from "./CartItem";

type CartProductContainerType = {
  data: cartItemType[];
  request?: (load: boolean) => void;
  setState: Dispatch<SetStateAction<cartItemType[]>>;
};

const CartProductContainer = ({
  data,
  request,
  setState,
}: CartProductContainerType) => {
  return (
    <>
      {data?.map((cartItem: cartItemType, i: number) => {
        return (
          <CartItem
            data={cartItem}
            key={i}
            request={request && request}
            setState={setState}
          />
        );
      })}
    </>
  );
};

export default CartProductContainer;
