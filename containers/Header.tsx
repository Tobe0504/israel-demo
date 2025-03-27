import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";

const Header = () => {
  // Router
  const router = useRouter();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 126,
        padding: 14,
        backgroundColor: "#fff",
      }}
    >
      {!navigation.canGoBack() ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="menu"
            size={25}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        </TouchableOpacity>
      )}
      <Image source={require("../assets/images/logo.png")} />
      <Ionicons
        name="cart-outline"
        size={25}
        onPress={() => router.push("/cart")}
      />
    </View>
  );
};

export default Header;
