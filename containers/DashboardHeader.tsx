import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const DashboardHeader = () => {
  // Router
  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: 16,
        paddingBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: "#FFCA05",
        marginBottom: 24,
      }}
    >
      <ThemedText type="subtitle" style={{ marginBottom: 12 }}>
        Explore our Showroom
      </ThemedText>
      <ThemedText style={{ width: "80%", marginBottom: 22 }}>
        Not sure of what you’re looking for? No worries, use{" "}
        <Text
          style={{
            fontStyle: "italic",
            fontFamily: "PoppinsBoldItalic",
            color: "#FFCA05",
          }}
        >
          Lighting Xplorer{" "}
        </Text>{" "}
        to see what you can get.
      </ThemedText>

      <CustomButton
        text="Proceed to Lighting Xplorer"
        type="secondary"
        icon="arrow-forward-outline"
        iconColor="#FFCA05"
        onPress={() => router.push("/lighting-explorer")}
      />
    </View>
  );
};

export default DashboardHeader;
