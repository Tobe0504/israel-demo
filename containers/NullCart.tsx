import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

const NullCart = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 54,
        paddingHorizontal: 32,
        paddingBottom: 32,
      }}
    >
      <Ionicons name="cart-outline" size={54} style={{ marginBottom: 45 }} />
      <ThemedText
        type="title"
        style={{
          fontSize: 24,
          marginBottom: 16,
          width: 336,
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        Your shopping cart is empty
      </ThemedText>
      <ThemedText>See your recently viewed products</ThemedText>
    </View>
  );
};

export default NullCart;
