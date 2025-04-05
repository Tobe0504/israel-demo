import CategoriesCard from "@/components/CategoriesCard";
import CustomButton from "@/components/CustomButton";
import { generateImageURL } from "@/helpers/generateImageURL";
import usePrice from "@/hooks/usePrice";
import { productType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { SafeAreaView, View, ViewComponent, ViewProps } from "react-native";
import { FlatList } from "react-native";
import { ThemedText } from "./ThemedText";

type ProductsListingsType = {
  data: productType[];
  setPageNumber?: Dispatch<SetStateAction<number>>;
  loading?: boolean;
};

const ProductsListings = ({
  data,
  setPageNumber,
  loading,
}: ProductsListingsType) => {
  // Router
  const router = useRouter();

  return (
    <>
      {data?.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item?.Id)}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <CategoriesCard
                title={item?.Name}
                price={item.Price}
                type="product"
                style={{
                  flex: 1,
                  margin: 8,
                }}
                imageUrl={generateImageURL(
                  item?.ProductImage[0].MobileImageUrl
                )}
                onPress={() => {
                  router.push(`/product/${item?.Id}`);
                }}
              />
            );
          }}
        />
      ) : (
        <ThemedText
          style={{
            textAlign: "center",
            marginVertical: 24,
            width: "100%",
          }}
        >
          No data available currently
        </ThemedText>
      )}

      <CustomButton
        text="Load more..."
        type="null"
        style={{ marginVertical: 32 }}
        onPress={() => {
          if (setPageNumber)
            if (data?.length > 0) {
              setPageNumber((prevState) => {
                return prevState + 1;
              });
            } else {
              setPageNumber(1);
            }
        }}
        loading={loading}
      />
    </>
  );
};

export default ProductsListings;
