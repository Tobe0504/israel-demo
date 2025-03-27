import Header from "@/containers/Header";
import ProductByCategories from "@/containers/ProductByCategories";
import { Stack } from "expo-router";

const index = () => {
  return (
    <>
      <Stack.Screen
        name="Category"
        options={{
          header: () => <Header />,
        }}
      />
      <ProductByCategories />
    </>
  );
};

export default index;
