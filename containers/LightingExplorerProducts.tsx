import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import ProductsListings from "@/components/ProductsListings";
import { AuthContext } from "@/context/AuthContext";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";

const LightingExplorerProducts = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // COntext
  const { lightingData } = useContext(AuthContext);

  // Router
  const router = useRouter();

  //   Hooks
  const { handleError } = useError();

  // Requests
  const getLightingProducts = () => {
    requestHandler({
      url: "api/product/getXplorerProducts",
      method: "POST",
      data: lightingData,
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
        router.back();
      },
    });
  };

  //   Effects
  useEffect(() => {
    if (lightingData?.BiggerSpace) {
      getLightingProducts();
    }
  }, [lightingData?.BiggerSpace]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader
        title="Suggested Products for"
        caption="Lighting Explorer"
      />

      {requestState?.isLoading ? (
        <Loader />
      ) : (
        <ProductsListings
          data={requestState?.data?.Result}
          loading={requestState?.isLoading}
        />
      )}
      {/* <Produc */}
    </ScrollView>
  );
};

export default LightingExplorerProducts;
