import CategorySectionsHeader from "@/components/CategorySectionsHeader";
import React from "react";
import { ScrollView } from "react-native";
import DashboardSearch from "./DashboardSearch";
import ProductsHeader from "@/components/ProductsHeader";
import { ThemedText } from "@/components/ThemedText";
import LightingExplorerForm from "./LightingExplorerForm";
import Header from "./Header";

const LightingExplorer = () => {
  return (
    <ScrollView
      style={{
        paddingHorizontal: 16,
        backgroundColor: "#fff",
      }}
    >
      <DashboardSearch />
      <ProductsHeader title="Lighting Xplorer" isNotFilter />
      <ThemedText>Give us some details about your space</ThemedText>
      <LightingExplorerForm />
    </ScrollView>
  );
};

export default LightingExplorer;
