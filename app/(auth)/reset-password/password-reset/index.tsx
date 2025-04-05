import AuthHeader from "@/containers/AuthHeader";
import PasswordReset from "@/containers/PasswordReset";
import ResetPassword from "@/containers/ResetPassword";
import { Stack } from "expo-router";
import React from "react";

const index = () => {
  return (
    <>
      <Stack.Screen
        name="Password Reset"
        options={{ header: () => <AuthHeader /> }}
      />
      <PasswordReset />
    </>
  );
};

export default index;
