import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

const LightingLayout = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="products"
          options={{
            title: "Products",
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default LightingLayout;
