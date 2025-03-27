import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import ProductsListings from "@/components/ProductsListings";
import { requestHandler } from "@/helpers/requestHandler";
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

  const handleGetProductsByCategoryId = () => {
    requestHandler({
      url: `api/⁠product/getApprovedProductsAndroid?ims=${pageNumber}`,
      //   load: false,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data, "Errorrr");
      },
      successFunction(res) {
        console.log(res, "Check");
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
