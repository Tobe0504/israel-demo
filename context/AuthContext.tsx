import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from "@/utils/constants";
import { productOrderType, requestType, userType } from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
// import { GoogleSignin } from "@react-native-google-signin/google-signin";
import googleConfig from "@/config/google";

type AuthContextValuesTypes = {
  user: userType | null;
  handleGetuserByEmail: (email: string) => void;
  orderItem: productOrderType;
  setOrderItem: Dispatch<SetStateAction<productOrderType>>;
};

type AuthContextProviderTypes = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValuesTypes);

const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  // States
  const [user, setUser] = useState<null | userType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [orderItem, setOrderItem] = useState<productOrderType>({
    date: "",
    price: 0,
  });
  const [userSignInDetailsFormData, setUserSignInDetailsFormData] = useState(
    new URLSearchParams()
  );

  // Config
  // GoogleSignin.configure({
  //   webClientId: googleConfig?.googge_web_client,
  //   iosClientId: googleConfig?.google_ios_client_id,
  //   scopes: ["profile", "email"],
  // });

  //   Requests
  const handleGetuserByEmail = (email: string) => {
    requestHandler({
      url: `/api/user/getUserByEmail?email=${email}`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        setUser(res?.data?.SingleResult);
      },
      errorFunction(err) {
        console.log(err);
      },
    });
  };

  // const signInWithGoogle = async () => {
  //   await GoogleSignin.hasPlayServices();
  //   const userInfo = await GoogleSignin.signIn();
  //   console.log("user:", userInfo);
  //   return userInfo?.data;
  // };

  // const handleGoogleSignIn = async () => {
  //   setRequestState((prevState) => {
  //     return { ...prevState, isLoading: true };
  //   });
  //   try {
  //     const response = await signInWithGoogle();
  //     const idToken = response?.idToken;
  //     const user = response?.user;

  //     console.log("Token:", idToken);

  //     if (idToken && user) {
  //       const subFormData = new URLSearchParams();

  //       subFormData.append("username", user?.name as string);
  //       // subFormData.append("password", user?.);
  //       subFormData.append("grant_type", "google");

  //       setUserSignInDetailsFormData(subFormData);
  //     }
  //   } catch (error) {}
  // };

  useEffect(() => {
    const fetchStoredEmail = async () => {
      try {
        const data = await getAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL);
        if (data) {
          handleGetuserByEmail(data as any);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
        return null;
      }
    };

    fetchStoredEmail();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, handleGetuserByEmail, orderItem, setOrderItem }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
