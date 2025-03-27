import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const SearchHeader = () => {
  // Router
  const { search } = useGlobalSearchParams();

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
        <ThemedText>Search results for </ThemedText>
        <ThemedText type="title">{search}</ThemedText>
      </View>
      <TouchableOpacity>
        <MaterialCommunityIcons name="filter-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchHeader;
