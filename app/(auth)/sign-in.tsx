import AuthHeader from "@/containers/AuthHeader";
import SignIn from "@/containers/SignIn";
import React from "react";

export const unstable_settings = {
  header: () => <AuthHeader />,
};

const SignInaPage = () => {
  return <SignIn />;
};

export default SignInaPage;
