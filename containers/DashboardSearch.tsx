import { Ionicons } from "@expo/vector-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

const DashboardSearch = () => {
  // Router
  const router = useRouter();

  const { search: searchKey } = useGlobalSearchParams();

  // States
  const [search, setSearch] = useState("");

  // Effects
  useEffect(() => {
    if (searchKey) {
      setSearch(searchKey as string);
    }
  }, [searchKey]);

  return (
    <View
      style={{
        height: 48,
        backgroundColor: "#C4C4C433",
        borderRadius: 5,
        position: "relative",
      }}
    >
      <TextInput
        placeholder="Search for a product, category or space."
        placeholderTextColor="#828282"
        style={{
          height: "100%",
          borderWidth: 0,
          color: "#000",
          paddingLeft: 47,
        }}
        onChangeText={setSearch}
        onSubmitEditing={() => {
          if (search?.trim()) {
            router.push(`/search?search=${encodeURIComponent(search)}`);
          }
        }}
        returnKeyType="search"
      />
      <Ionicons
        name="search-outline"
        size={20}
        style={{
          position: "absolute",
          left: 24,
          top: "50%",
          transform: [{ translateX: 0 }, { translateY: -10 }],
        }}
      />
    </View>
  );
};

export default DashboardSearch;
