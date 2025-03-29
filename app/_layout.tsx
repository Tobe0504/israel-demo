import { ThemedText } from "@/components/ThemedText";
import ActiveUserHeader from "@/containers/ActiveUserHeader";
import AuthHeader from "@/containers/AuthHeader";
import Header from "@/containers/Header";
import AuthContextProvider from "@/context/AuthContext";
import { requestHandler } from "@/helpers/requestHandler";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Alert, Linking, View } from "react-native";
import "react-native-reanimated";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import * as Application from "expo-application";
import { storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { LOCAL_STORAGE_BASE_CURRENCY } from "@/utils/constants";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

export default function RootLayout() {
  const colorScheme = "light";
  const [loaded] = useFonts({
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Light.ttf"),
  });

  // States
  const [appIsReady, setAppIsReady] = useState(false);
  const [requestState, setRequestState] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  // Requests
  const getAppVersion = () => {
    requestHandler({
      url: `api/version/getAppVersion`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data, 10000);
      },
      successFunction(res) {
        const latestVersion = res?.data.iOSVersion;
        const currentVersion = Application.nativeApplicationVersion || "0.0.0";
        if (String(currentVersion) === String(latestVersion)) {
          Alert.alert(
            "Update Required",
            "A new version of the app is available. Please update from the App Store.",
            [
              {
                text: "Update",
                onPress: () => Linking.openURL("https://thelightinghaus.com"),
              },
            ]
          );
        } else {
          getUserIp();
        }
      },
    });
  };

  const getUserIp = () => {
    requestHandler({
      url: `https://api.ipify.org`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data);
      },
      successFunction(res) {
        getUserIpWithCountryCode(res?.data);
      },
    });
  };

  const getUserIpWithCountryCode = (ip: string) => {
    console.log(ip, "STROING");
    requestHandler({
      url: `http://ip-api.com/json/${ip}?fields=status,message,countryCode,currency,query`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response, "ERRRRR");
      },
      successFunction(res) {
        getCountryCode(res?.data?.currency);
      },
    });
  };

  const getCountryCode = (currency: string) => {
    requestHandler({
      url: `api/exchangeRate/getCurrencyRates?curr=${currency}`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response, "ERRRRR");
      },
      successFunction(res) {
        const currencyObject = res?.data?.Result?.find(
          (data: {
            Id: number;
            Currency: string;
            Value: number;
            MostUsed: boolean;
            CountryCode: string;
          }) => data?.Currency === currency
        );

        storeAsyncData(
          LOCAL_STORAGE_BASE_CURRENCY,
          JSON.stringify(currencyObject)
        );
      },
    });
  };

  useEffect(() => {
    async function prepare() {
      getAppVersion();
      await SplashScreen.preventAutoHideAsync();

      if (loaded) {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      }
    }
    prepare();
  }, [loaded]);

  // const onLayoutRootView = useCallback(() => {
  //   if (appIsReady || !loaded) {
  //     SplashScreen.hide();
  //   }
  // }, [appIsReady, loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />

          <Stack.Screen
            name="(auth)"
            options={{
              title: "auth",
              header: () => <AuthHeader />,
            }}
          />

          <Stack.Screen
            name="(drawer)"
            options={{
              title: "drawer",
              header: () => <Header />,
            }}
          />

          <Stack.Screen name="(drawer)/(sub-pages)" />
        </Stack>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
