import AuthHeader from "@/containers/AuthHeader";
import ResetPassword from "@/containers/ResetPassword";
import { Stack } from "expo-router";
import React from "react";

const index = () => {
  return (
    <>
      <Stack.Screen
        name="Reset Password"
        options={{
          header: () => <AuthHeader />,
        }}
        // options={{ headerShown: false }}
      />
      <ResetPassword />
    </>
  );
};

export default index;
