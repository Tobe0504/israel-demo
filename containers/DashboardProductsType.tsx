import CategoriesCard2 from "@/components/CategoriesCard2";
import CategoriesCard3 from "@/components/CategoriesCard3";
import Loader from "@/components/Loader";
import { BACKEND_API_URL } from "@/config";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import { productCategoriesType, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

const DashboardProductsType = () => {
  // Router
  const router = useRouter();

  //   States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Requests
  const handleGetProductCategories = () => {
    requestHandler({
      url: "/api/productType/getProductTypes",
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.dir(err, { depth: null, colors: true });
      },
    });
  };

  //   Effects
  useEffect(() => {
    handleGetProductCategories();
  }, []);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {requestState?.data?.Result?.map((data: productCategoriesType) => {
        return (
          <CategoriesCard2
            title={data?.Name}
            imageURL={generateImageURL(data?.MobileUrl)}
            onPress={() => router.push(`/(drawer)/category/${data?.Id}`)}
            key={data?.MobileUrl}
          />
        );
      })}
    </View>
  );
};

export default DashboardProductsType;
