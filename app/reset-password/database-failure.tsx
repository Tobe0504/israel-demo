import Feedback from "@/containers/Feedback";
import { useRouter } from "expo-router";
import React from "react";

export const unstable_settings = {
  headerShown: false,
};

const page = () => {
  // Router
  const router = useRouter();

  return (
    <Feedback
      title="Sorry, we couldn’t find your email in our database."
      caption="Kindly provide the right email address you used while signing up."
      buttonText="Go Back"
      type="error"
      icon="close-circle-outline"
      onPress={() => {
        router.back();
      }}
    />
  );
};

export default page;
