import Header from "@/containers/Header";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import React from "react";

const ResetLayout = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="database-success"
          options={{
            title: "Database Success",
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="database-failure"
          options={{
            headerShown: false,
            title: "Database Failure",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default ResetLayout;
