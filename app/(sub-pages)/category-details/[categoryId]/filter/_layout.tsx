import ActiveUserHeader from "@/containers/ActiveUserHeader";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

const FiltersLayout = () => {
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

export default FiltersLayout;
