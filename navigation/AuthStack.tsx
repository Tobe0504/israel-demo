import { Text, View } from "react-native";
import React, { Component } from "react";
import { Stack } from "expo-router";
import AuthHeader from "@/containers/AuthHeader";

export class AuthStack extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: "sign-in",
            header: (props) => <AuthHeader />,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            title: "sign-up",
            header: (props) => <AuthHeader />,
          }}
        />

        {/* <Stack.Screen
          name="reset-password"
          options={{
            title: "reset-password",
            header: (props) => <AuthHeader />,
          }}
        /> */}
      </Stack>
    );
  }
}

export default AuthStack;
