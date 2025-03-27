import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAsyncData, storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { LOCAL_STORAGE_AUTH_KEY_NAME } from "@/utils/constants";
import { useRouter } from "expo-router";
import Loader from "./Loader";

type RequireAuthTypes = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthTypes) => {
  const [loading, setLoading] = useState(true);
  const navigation = useRouter();
  const route = useRoute();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAsyncData(LOCAL_STORAGE_AUTH_KEY_NAME);

        if (!token) {
          await storeAsyncData("redirectAfterLogin", route.name);

          navigation.push("/sign-in");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  return children;
};

export default RequireAuth;
