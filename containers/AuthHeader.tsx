import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageBackground, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AuthHeader = () => {
  // Router
  const router = useRouter();

  return (
    <View
      style={{
        height: 126,
        backgroundColor: "#fff",
        position: "sticky",
        top: 0,
      }}
    >
      <ImageBackground
        source={require("../assets/images/signUpImageBg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={{
            position: "absolute",
            top: 42,
            bottom: 0,
            margin: "auto",
            left: 52,
            zIndex: 2,
            resizeMode: "cover",
          }}
        />

        {/* <TouchableOpacity
          style={{ position: "absolute", left: 20, top: 20 }}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="keyboard-backspace"
            size={24}
            style={{
              position: "absolute",
              top: 30,
              margin: "auto",
              zIndex: 10,
            }}
          />
        </TouchableOpacity> */}
      </ImageBackground>
    </View>
  );
};

export default AuthHeader;
