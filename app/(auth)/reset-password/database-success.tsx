import Feedback from "@/containers/Feedback";
import React from "react";
import openEmailClient from "@/helpers/openEmailClient";
import { useRouter } from "expo-router";

export const unstable_settings = {
  headerShown: false,
};

const page = () => {
  // Router
  const router = useRouter();
  return (
    <Feedback
      title="Password reset link has been sent successfully"
      caption="Kindly click on the link sent to your email to reset your password"
      buttonText="Open email app"
      icon="check-circle-outline"
      type="success"
      onPress={() => {
        router.push("/reset-password/passworrd-reset");
        openEmailClient();
      }}
    />
  );
};

export default page;
