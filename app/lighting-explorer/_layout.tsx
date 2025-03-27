import Header from "@/containers/Header";
import { Stack } from "expo-router";
import React from "react";

const LightingExplorerLayout = () => {
  return (
    <Stack
    // screenOptions={{
    //   headerShown: false, // Hide default header globally
    // }}
    >
      <Stack.Screen
        name="suggestions"
        options={{ header: () => <Header />, title: "suggestions" }}
      />
    </Stack>
  );
};

export default LightingExplorerLayout;
