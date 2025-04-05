import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ProductsHeaderTypes = {
  title: string;
  caption?: string;
  isNotFilter?: boolean;
};

const ProductsHeader = ({ title, caption, isNotFilter }: ProductsHeaderTypes) => {
  const router = useRouter();

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
        <TouchableOpacity onPress={() => router.push("/filter")}>
          <MaterialCommunityIcons name="filter-outline" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductsHeader;
