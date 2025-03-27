import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { requestType } from "@/utils/types";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CartProductContainer from "./CartProductContainer";
import CartRelatedCustomers from "./CartRelatedCustomers";
import CartSubtotal from "./CartSubtotal";
import NullCart from "./NullCart";
import RelatedCustomers from "./RelatedCustomers";
import RelatedProducts from "./RelatedProducts";

const Cart = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [relatedProductsState, setRelatedpProductsState] =
    useState<requestType>({
      isLoading: false,
      data: null,
      error: null,
    });

  // Context
  const { user } = useContext(AuthContext);

  // Hooks
  const { handleError } = useError();

  // Requests
  const getCartItems = () => {
    requestHandler({
      url: `api/cart/getUserCart`,
      data: { UserId: user?.Id },
      method: "POST",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data, 10000);
        handleError(err);
      },
      successFunction(res) {
        console.log(res, "Check");
      },
    });
  };

  const getRelatedProducts = () => {
    requestHandler({
      url: `api/cart/getTopFiveRelatedCartProductsByOthers`,
      data: { UserId: user?.Id },
      method: "POST",
      state: relatedProductsState,
      setState: setRelatedpProductsState,
      errorFunction(err) {
        handleError(err);
        console.log(err?.response?.data, "Errorrr");
      },
      successFunction(res) {
        console.log(res, "Check");
      },
    });
  };

  // Effects
  useEffect(() => {
    getCartItems();
    getRelatedProducts();
  }, []);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {requestState?.data?.Result?.length > 0 ? (
        <>
          <CartProductContainer
            data={requestState?.data?.Result}
            request={getCartItems}
          />
          <CartSubtotal />
        </>
      ) : (
        <NullCart />
      )}

      {relatedProductsState?.data?.Result?.length > 0 && (
        <CartRelatedCustomers
          data={relatedProductsState?.data?.Result}
          loading={relatedProductsState?.isLoading}
        />
      )}
    </ScrollView>
  );
};

export default Cart;
