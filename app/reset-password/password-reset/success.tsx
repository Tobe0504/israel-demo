import Feedback from "@/containers/Feedback";
import { useRouter } from "expo-router";
import React from "react";

const page = () => {
  // Router
  const router = useRouter();
  return (
    <Feedback
      title="Password reset was successfully"
      caption="You can now use your new password to login to your account"
      buttonText="Proceed to Login"
      icon="check-circle-outline"
      type="success"
      onPress={() => router.push("/sign-in")}
    />
  );
};

export default page;
