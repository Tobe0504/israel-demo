import Categories from "@/components/Categories";
import CategoriesCard from "@/components/CategoriesCard";
import Loader from "@/components/Loader";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import { productType, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, View } from "react-native";

type CartRelatedCustomersTypes = {
  isNotCart?: boolean;
  data: productType[];
  loading?: boolean;
};

const CartRelatedCustomers = ({
  isNotCart,
  data,
  loading,
}: CartRelatedCustomersTypes) => {
  // Router
  const router = useRouter();

  return (
    <View style={[!isNotCart && { paddingVertical: 16, marginHorizontal: 16 }]}>
      <Categories
        title="Customers who bought items in your recent history also bought"
        style={{ paddingVertical: 16, margin: 16 }}
      >
        {loading ? (
          <Loader />
        ) : (
          <FlatList
            data={data}
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

export default CartRelatedCustomers;
