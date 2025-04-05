import React from "react";
import { ScrollView } from "react-native";
import ProductsHeader from "@/components/ProductsHeader";
import { ThemedText } from "@/components/ThemedText";
import LightingExplorerForm from "./LightingExplorerForm";

const LightingExplorer = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <ProductsHeader title="Lighting Xplorer" isNotFilter />
      <ThemedText>Give us some details about your space</ThemedText>
      <LightingExplorerForm />
    </ScrollView>
  );
};

export default LightingExplorer;
