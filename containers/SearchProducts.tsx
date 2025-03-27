import CategoriesCard from "@/components/CategoriesCard";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { generateImageURL } from "@/helpers/generateImageURL";
import { productType } from "@/utils/types";
import { router, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { FlatList } from "react-native";

type SearchProductsTypes = {
  data: productType[];
};

const SearchProducts = ({ data }: SearchProductsTypes) => {
  // Router
  const router = useRouter();

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item?.Id)}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <CategoriesCard
                title={item?.Name}
                price={item?.Price}
                type="product"
                style={{ flexBasis: "50%" }}
                imageUrl={generateImageURL(item?.ProductImage[0]?.WebImageUrl)}
                onPress={() => router.push(`/product/${item?.Id}`)}
              />
            );
          }}
        />
      ) : (
        <ThemedText
          style={{ marginVertical: 16, textAlign: "center", fontSize: 16 }}
        >
          No content available
        </ThemedText>
      )}
    </>
  );
};

export default SearchProducts;
