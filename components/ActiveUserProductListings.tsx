import { productType } from "@/utils/types";
import { ThemeContext } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import ProductCard from "./ProductCard";
import { ThemedText } from "./ThemedText";

type ActiveUserProductListingsType = {
  data: productType[];
  onDelete: (id: number) => void;
  loading: boolean;
};

const ActiveUserProductListings = ({
  data,
  onDelete,
  loading,
}: ActiveUserProductListingsType) => {
  return data?.length > 0 ? (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item?.Id)}
      renderItem={({ item }) => {
        return (
          <ProductCard data={item} loading={loading} onDelete={onDelete} />
        );
      }}
      style={{ padding: 16 }}
    />
  ) : (
    <ThemedText style={{ textAlign: "center", padding: 16, fontSize: 16 }}>
      No list item available
    </ThemedText>
  );
};

export default ActiveUserProductListings;
