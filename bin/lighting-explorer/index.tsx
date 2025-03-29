import Header from "@/containers/Header";
import LightingExplorer from "@/containers/LightingExplorer";
import { Stack } from "expo-router";

const index = () => {
  return (
    <>
      <Stack.Screen
        name="lighting-explorer"
        options={{ header: () => <Header /> }}
      />
      <LightingExplorer />
    </>
  );
};

export default index;
