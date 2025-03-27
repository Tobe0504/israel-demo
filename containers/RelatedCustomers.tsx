import Categories from "@/components/Categories";
import CategoriesCard from "@/components/CategoriesCard";
import Loader from "@/components/Loader";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import { productType, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

type RelatedCustomersTypes = {
  isNotCart?: boolean;
  data: productType;
};

const RelatedCustomers = ({ isNotCart, data }: RelatedCustomersTypes) => {
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
      successFunction(res) {
        console.log(res?.data?.Result);
      },
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
    <View style={[!isNotCart && { paddingVertical: 16, marginHorizontal: 16 }]}>
      <Categories
        title="Customers who bought items in your recent history also bought"
        style={{ paddingVertical: 16, margin: 16 }}
      >
        {requestState?.isLoading ? (
          <Loader />
        ) : (
          <FlatList
            data={requestState?.data?.Result}
            keyExtractor={(item) => String(item?.Id)}
            nestedScrollEnabled
            horizontal
            renderItem={({ item }) => {
              return (
                <CategoriesCard
                  title={item?.Name}
                  type="product"
                  price={item?.Price}
                  imageUrl={generateImageURL(
                    item?.ProductImage[0]?.MobileImageUrl
                  )}
                  onPress={() => router?.push(`/product/${item?.Id}`)}
                />
              );
            }}
          />
        )}
      </Categories>
    </View>
  );
};

export default RelatedCustomers;
