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

const FilterProducts = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // COntext
  const { productsFilterData } = useContext(AuthContext);

  // Router
  const router = useRouter();

  //   Hooks
  const { handleError } = useError();

  // Requests
  const getLightingProducts = () => {
    requestHandler({
      url: "api/product/getFilteredProducts",
      method: "POST",
      data: productsFilterData,
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
        router.back();
      },
    });
  };

  console.log(productsFilterData, "Filter");

  //   Effects
  useEffect(() => {
    getLightingProducts();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader
        title="Suggested Products for"
        caption="Filtered"
        isNotFilter
      />

      {requestState?.isLoading ? (
        <Loader />
      ) : (
        <ProductsListings
          data={requestState?.data?.Result}
          loading={requestState?.isLoading}
        />
      )}
    </ScrollView>
  );
};

export default FilterProducts;
