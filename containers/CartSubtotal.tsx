import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View } from "react-native";

const CartSubtotal = () => {
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
        <ThemedText type="defaultSemiBold">N120,000</ThemedText>
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
        <ThemedText type="defaultSemiBold">N120,000</ThemedText>
      </View>

      <CustomButton text="Proceed to Checkout" type="secondary" />
    </View>
  );
};

export default CartSubtotal;
