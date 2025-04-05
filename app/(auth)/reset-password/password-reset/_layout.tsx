import AuthHeader from "@/containers/AuthHeader";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

const PasswordReset = () => {
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="success"
          options={{
            title: "Database Success",
            header: () => <AuthHeader />,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default PasswordReset;
