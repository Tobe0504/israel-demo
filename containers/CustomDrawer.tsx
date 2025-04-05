import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import React, { useContext } from "react";
import { View } from "react-native";

const CustomDrawer = ({ props }: any) => {
  // Context
  const { user } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#FFCA05",
          paddingVertical: 45,
          paddingHorizontal: 30,
          justifyContent: "center",
        }}
      >
        <ThemedText type="defaultSemiBold">Hello, {user?.Name}</ThemedText>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => {
          router.push("/dashboard");
        }}
        labelStyle={{
          fontFamily: "PoppinsRegular",
          fontSize: 14,
          color: "#000",
        }}
      />

      {user && (
        <>
          <DrawerItem
            label="My List"
            onPress={() => {
              router.push("/my-list");
            }}
          />

          <DrawerItem
            label="My Account"
            onPress={() => {
              router.push("/my-account");
            }}
          />
        </>
      )}

      {!user && (
        <>
          <DrawerItem
            label="Sign In"
            onPress={() => {
              router.push("/sign-in");
            }}
          />

          <DrawerItem
            label="Sign Up"
            onPress={() => {
              router.push("/sign-up");
            }}
          />
        </>
      )}
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
