import Loader from "@/components/Loader";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import ProductDetailsImageCarousel from "./ProductDetailsImageCarousel";
import ProductDetailsInformation from "./ProductDetailsInformation";
import RelatedCustomers from "./RelatedCustomers";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Router
  const { productId } = useLocalSearchParams();

  // Requests
  const getProductDetailsHandler = () => {
    requestHandler({
      url: `api/product/getSingleProduct?Id=${productId}`,
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

  // Effects
  useEffect(() => {
    if (productId) {
      getProductDetailsHandler();
    }
  }, []);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff", padding: 16 }}>
      <ProductDetailsImageCarousel data={requestState?.data?.SingleResult} />
      <ProductDetailsInformation data={requestState?.data?.SingleResult} />
      <RelatedCustomers isNotCart data={requestState?.data?.SingleResult} />
    </ScrollView>
  );
};

export default ProductDetails;
