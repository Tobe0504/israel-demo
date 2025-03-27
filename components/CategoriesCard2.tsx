import { formatCurrencyWithoutTrailingDecimals } from "@/helpers/formatAmount";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ThemedText } from "./ThemedText";

type CategoriesCard2Types = {
  title: string;
  onPress?: () => void;
  imageURL: string;
};

const { width } = Dimensions.get("window");

const CategoriesCard2 = ({
  title,
  onPress,
  imageURL,
}: CategoriesCard2Types) => {
  return (
    <TouchableOpacity
      style={{
        marginRight: 12,
        position: "relative",
        width: width - 32,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: imageURL }}
        style={{
          width: "100%",
          height: 160,
          marginBlock: 14,
          borderRadius: 5,
        }}
      />
      <ThemedText
        type="defaultSemiBold"
        style={{
          fontFamily: "PoppinsMedium",
          fontSize: 22,
          paddingHorizontal: 22,
          paddingVertical: 4,
          backgroundColor: "#FFCA05",
          position: "absolute",
          bottom: 24,
          left: 19,
        }}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default CategoriesCard2;
