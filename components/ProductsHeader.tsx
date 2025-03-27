import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type ProductsHeaderTypes = {
  title: string;
  caption?: string;
  isNotFilter?: boolean;
};

const ProductsHeader = ({
  title,
  caption,
  isNotFilter,
}: ProductsHeaderTypes) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingTop: 17,
      }}
    >
      <View>
        {caption && <ThemedText>{title} </ThemedText>}
        {caption ? (
          <ThemedText type="title">{caption}</ThemedText>
        ) : (
          <ThemedText type="title">{title}</ThemedText>
        )}
      </View>
      {!isNotFilter && (
        <TouchableOpacity>
          <MaterialCommunityIcons name="filter-outline" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductsHeader;
