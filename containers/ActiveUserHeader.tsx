import { ThemedText } from "@/components/ThemedText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter, useSegments } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

type ActiveUserHeaderTypes = {
  title: string;
};

const ActiveUserHeader = ({ title }: ActiveUserHeaderTypes) => {
  // Router and Navigation
  const navigation = useNavigation();
  const router = useRouter();
  const segments = useSegments() as string[];

  const isCartPage = segments.includes("cart");

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingInline: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 58,
        position: "relative",
        borderBottomWidth: 1,
        borderBottomColor: "#828282",
        backgroundColor: "#fff",
      }}
    >
      {navigation?.canGoBack() ? (
        <TouchableOpacity onPress={() => (navigation.canGoBack() ? navigation.goBack() : router.back())}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <MaterialCommunityIcons name="menu" size={25} />
        </TouchableOpacity>
      )}

      <ThemedText style={{ fontSize: 20 }} type="defaultSemiBold">
        {title}
      </ThemedText>

      {isCartPage ? (
        <View style={{ minWidth: 16 }} />
      ) : (
        <View>
          <Ionicons name="cart-outline" size={25} onPress={() => router.push("/cart")} />
        </View>
      )}
    </View>
  );
};

export default ActiveUserHeader;
