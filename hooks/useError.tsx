import { storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { LOCAL_STORAGE_REDIRECT_ROUTE } from "@/utils/constants";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "expo-router";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";

const useError = () => {
  // Router
  const router = useRouter();
  const pathname = usePathname();

  const handleError = async (error: AxiosError) => {
    if (error?.status === 401) {
      await storeAsyncData(LOCAL_STORAGE_REDIRECT_ROUTE, pathname);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please sign in to continue",
        visibilityTime: 5000,
      });

      router.push("/sign-in");
      return;
    }

    Toast.show({
      type: "error",
      text1: "Error",
      text2: (error?.response?.data as any)?.error,
      visibilityTime: 5000,
    });
  };

  return { handleError };
};

export default useError;
