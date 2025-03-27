import CategoryPage from "@/components/CategoryPage";
import Header from "@/containers/Header";
import { Stack } from "expo-router";
import React from "react";

const index = () => {
  return (
    <>
      <Stack.Screen options={{ header: () => <Header /> }} />
      <CategoryPage />
    </>
  );
};

export default index;
