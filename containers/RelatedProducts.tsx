import Categories from "@/components/Categories";
import Loader from "@/components/Loader";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import { productType, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";

type RelatedProductsTypes = {
  isNotCart?: boolean;
  data: productType;
};

const RelatedProducts = ({ isNotCart, data }: RelatedProductsTypes) => {
  // Router
  const router = useRouter();

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Requests
  const handleGetRelatedProducts = () => {
    requestHandler({
      url: `api/product/getApprovedProductsByProductType?iks=${data?.ProductType?.Id}&ims=1`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console?.log(err?.response?.data);
        Alert.alert("Error", (err?.response?.data as any)?.error, [
          { text: "Okay" },
        ]);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (data?.ProductType?.Id) {
      handleGetRelatedProducts();
    }
  }, [data]);

  return (
    <View style={[!isNotCart && { marginHorizontal: 16, paddingVertical: 16 }]}>
      <Categories title="Related Products" isNotScroll>
        {requestState?.isLoading ? (
          <Loader />
        ) : (
          <>
            <FlatList
              data={requestState?.data?.Result}
              keyExtractor={(item) => String(item?.Id)}
              horizontal
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => router.push(`/product/${item?.Id}`)}
                  >
                    <Image
                      source={{
                        uri: generateImageURL(
                          item?.ProductImage[0]?.MobileImageUrl
                        ),
                      }}
                      style={{
                        width: 145,
                        height: 176,
                        borderRadius: 5,
                        marginRight: 10,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
              nestedScrollEnabled
            />
          </>
        )}
      </Categories>
    </View>
  );
};

export default RelatedProducts;
