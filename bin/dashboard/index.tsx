import DashBoard from "@/containers/DashBoard";
import Header from "@/containers/Header";
import { Stack } from "expo-router";
import React from "react";

const index = () => {
  return (
    <>
      <Stack.Screen
        name="Dashboard"
        options={{
          header: () => <Header />,
        }}
      />
      <DashBoard />
    </>
  );
};

export default index;
