import ProductsHeader from "@/components/ProductsHeader";
import ProductsListings from "@/components/ProductsListings";
import React from "react";
import { ScrollView } from "react-native";

const Products = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader title="All Products" />
      {/* <ProductsListings /> */}
    </ScrollView>
  );
};

export default Products;
