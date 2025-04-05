import AuthHeader from "@/containers/AuthHeader";
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
            header: () => <AuthHeader />,
          }}
        />

        <Stack.Screen
          name="database-failure"
          options={{
            title: "Database Failure",
            header: () => <AuthHeader />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default ResetLayout;
