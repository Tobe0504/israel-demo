import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";

type CategoriesCard3Types = {
  title: string;
  onPress?: () => void;
};

const CategoriesCard3 = ({ title, onPress }: CategoriesCard3Types) => {
  // Utils
  return (
    <TouchableOpacity
      style={{
        marginRight: 12,
        position: "relative",
        flexBasis: "29%",
      }}
      onPress={onPress}
    >
      <Image
        source={require("../assets/images/categoryImage.png")}
        style={{
          width: "100%",
          height: 73,
          marginBlock: 5,
          borderRadius: 5,
        }}
      />
      <ThemedText
        type="defaultSemiBold"
        style={{
          fontFamily: "PoppinsMedium",
          fontSize: 12,
        }}
      >
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
};

export default CategoriesCard3;
