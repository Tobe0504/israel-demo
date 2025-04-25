import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import ProductsListings from "@/components/ProductsListings";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { requestType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const AllProducts = () => {
  //   States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [pageNumber, setPageNumber] = useState(30);

  // Hooks
  const { handleError } = useError();

  const handleGetProductsByCategoryId = () => {
    requestHandler({
      url: `/api/product/getApprovedProductsAndroid?iks=${pageNumber}`,
      //   load: false,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
        console.log(err?.response);
      },
    });
  };

  useEffect(() => {
    handleGetProductsByCategoryId();
  }, [pageNumber]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader title="All Products" />

      {requestState?.isLoading && !requestState?.data ? (
        <Loader />
      ) : (
        <ProductsListings
          data={requestState?.data?.Result}
          setPageNumber={setPageNumber}
          loading={requestState?.isLoading}
        />
      )}
    </ScrollView>
  );
};

export default AllProducts;
