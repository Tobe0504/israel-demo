import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="filter"
          options={{
            title: "Filter",
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default Layout;
