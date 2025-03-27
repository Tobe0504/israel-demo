import { Text, View } from "react-native";
import React, { Component } from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";
import Header from "@/containers/Header";

export class MainStack extends Component {
  render() {
    return (
      <Stack>
        <Stack.Screen
          name="dashboard"
          options={{
            title: "cart",
            header: () => <Header />,
          }}
        />

        <Stack.Screen
          name="product"
          options={{
            title: "product",
            header: () => <Header />,
          }}
        />
      </Stack>
    );
  }
}

export default MainStack;
