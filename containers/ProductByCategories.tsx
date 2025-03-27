import Loader from "@/components/Loader";
import ProductsHeader from "@/components/ProductsHeader";
import ProductsListings from "@/components/ProductsListings";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const ProductByCategories = () => {
  // Router
  const { categoryId } = useLocalSearchParams();

  //   States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [pageNumber, setPageNumber] = useState(1);

  const handleGetProductsByCategoryId = () => {
    requestHandler({
      url: `api/product/getApprovedProductsByProductType?iks=${categoryId}&ims=${pageNumber}`,
      //   load: false,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.dir(err, { depth: null, colors: true });
      },
      successFunction(res) {
        console.log(res, "Check");
      },
    });
  };

  useEffect(() => {
    if (categoryId) {
      handleGetProductsByCategoryId();
    }
  }, [categoryId, pageNumber]);

  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader title="All Products" caption="Category" />
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

export default ProductByCategories;
