import { formatCurrencyWithoutTrailingDecimals } from "@/helpers/formatAmount";
import usePrice from "@/hooks/usePrice";
import React, { CSSProperties, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

type CategoriesCardTypes = {
  type: "category" | "product";
  title: string;
  price?: string | number;
  discount?: number;
  style?: any;
  imageUrl?: string;
  onPress?: () => void;
};

const CategoriesCard = ({
  type,
  title,
  price,
  discount,
  style,
  imageUrl,
  onPress,
}: CategoriesCardTypes) => {
  // Utils
  const discountedPrice =
    discount && price && Number(price) - Number(price) * (discount / 100);

  // State
  const [priceState, setPriceState] = useState("0");

  // Hook
  const { returnExchangeRatedPrice } = usePrice();

  // Utils
  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setPriceState(priceValue as string);
  };

  // Effects
  useEffect(() => {
    if (price) {
      getPrice(price);
    }
  }, [price]);

  return (
    <TouchableOpacity
      style={{
        marginRight: 12,
        position: "relative",
        ...style,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: "100%",
          height: type === "category" ? 129 : 176,
          marginBlock: 14,
          borderRadius: 5,
        }}
      />
      <ThemedText type="defaultSemiBold">{title}</ThemedText>
      {discount && (
        <Text
          style={{
            fontSize: 10,
            fontFamily: "PoppinsRegular",
            position: "absolute",
            top: 30,
            left: 0,
            backgroundColor: "#000",
            color: "#fff",
            paddingHorizontal: 3,
            paddingVertical: 6,
          }}
        >
          {discount}% OFF
        </Text>
      )}
      {price && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ThemedText
            type="defaultSemiBold"
            style={{ fontFamily: "PoppinsBold", fontSize: 12 }}
          >
            {priceState}
          </ThemedText>
          {discount && (
            <ThemedText
              type="defaultSemiBold"
              style={{
                fontFamily: "PoppinsRegular",
                fontSize: 12,
                color: "#FF0000",
                textDecorationColor: "red",
                textDecorationLine: "line-through",
              }}
            >
              N{formatCurrencyWithoutTrailingDecimals(price)}
            </ThemedText>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CategoriesCard;
