import ActiveUserHeader from "@/containers/ActiveUserHeader";
import ProductDetails from "@/containers/ProductDetails";
import { Stack } from "expo-router";

const ProductById = () => {
  return (
    <>
      <Stack.Screen
        options={{
          header: () => <ActiveUserHeader title={"Products Details"} />,
        }}
      />
      <ProductDetails />
    </>
  );
};

export default ProductById;
