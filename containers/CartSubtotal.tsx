import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import usePrice from "@/hooks/usePrice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

type CartSubtotalTypes = {
  loading: boolean;
  total: string | number;
};

const CartSubtotal = ({ loading, total }: CartSubtotalTypes) => {
  // Hooks
  const { returnExchangeRatedPrice } = usePrice();

  // ROuter
  const router = useRouter();

  // States
  const [totalState, setTotalState] = useState("");
  const [subTotalState, setSubTotalState] = useState("");

  // Utils
  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setTotalState(priceValue as string);
    setSubTotalState(priceValue as string);
  };

  // Effects
  useEffect(() => {
    if (total) {
      getPrice(total);
    }
  }, [total]);

  return (
    <View
      style={{
        backgroundColor: "#FFCA05",
        paddingHorizontal: 18,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBlock: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: "#000",
        }}
      >
        <ThemedText type="defaultSemiBold">Subtotal: </ThemedText>
        <ThemedText type="defaultSemiBold">{subTotalState}</ThemedText>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBlock: 16,
          borderBottomWidth: 0.5,
          borderBottomColor: "#000",
        }}
      >
        <ThemedText type="defaultSemiBold">Total: </ThemedText>
        <ThemedText type="defaultSemiBold">{totalState}</ThemedText>
      </View>

      <CustomButton
        text="Proceed to Checkout"
        type="secondary"
        loading={loading}
        onPress={() => router.push("/shipping-options")}
        disabled={loading}
      />
    </View>
  );
};

export default CartSubtotal;
