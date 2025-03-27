import React from "react";
import { Text, View } from "react-native";
import { ThemedText } from "./ThemedText";

type CategorySectionsHeaderTypes = {
  title: string;
};

const CategorySectionsHeader = ({ title }: CategorySectionsHeaderTypes) => {
  return (
    <View style={{ flexDirection: "row", gap: 16, marginTop: 0 }}>
      <View
        style={{
          height: 1,
          backgroundColor: "#000",
          marginVertical: 10,
          flex: 1,
        }}
      />
      <ThemedText style={{ color: "#828282" }}>{title}</ThemedText>
    </View>
  );
};

export default CategorySectionsHeader;
