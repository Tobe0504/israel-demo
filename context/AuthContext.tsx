import { getAsyncData, storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import {
  LOCAL_STORAGE_AUTH_KEY_NAME,
  LOCAL_STORAGE_AUTH_NEW_USER,
  LOCAL_STORAGE_AUTH_USER_EMAIL,
} from "@/utils/constants";
import {
  lightingDataType,
  productOrderType,
  requestType,
  userType,
} from "@/utils/types";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { makeRedirectUri } from "expo-auth-session";
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";
import Constants from "expo-constants";
import { Alert, Platform } from "react-native";
import { useRouter } from "expo-router";

// Initialize WebBrowser
WebBrowser.maybeCompleteAuthSession();

// Get config from expo constants
const {
  googge_web_client: webClientId,
  google_ios_client_id: iosClientId,
  facebook_application_id: facebookAppId
} = Constants.expoConfig?.extra || {};

type AuthContextValuesTypes = {
  user: userType | null;
  handleGetuserByEmail: (email: string) => void;
  orderItem: productOrderType;
  setOrderItem: Dispatch<SetStateAction<productOrderType>>;
  signInWithFacebook: () => Promise<void>;
  signInWithGoogle: (options?: AuthRequestPromptOptions) => Promise<void>;
  googleAuthLoading: boolean;
  facebookAuthLoading: boolean;
  lightingData: lightingDataType;
  setLightingData: Dispatch<SetStateAction<lightingDataType>>;
};

type AuthContextProviderTypes = {
  children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextValuesTypes);

const AuthContextProvider = ({ children }: AuthContextProviderTypes) => {
  const router = useRouter();

  // States
  const [user, setUser] = useState<null | userType>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [orderItemState, setOrderItemState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [orderItem, setOrderItem] = useState<productOrderType>({
    Id: 0,
    UserId: 0,
    ShippingId: 0,
    TotalPrice: 0,
    Fee: 0,
    TransactionRef: 0,
    FromCart: false,
    Error: null,
    ShippingOption: "Pickup",
    PickupDate: "",
    ConversionRate: "",
    ShippingFee: 0,
    OrderWeight: 0,
    Currency: "",
    Comment: "",
    PaymentGateway: "",
    Status: null,
    TotalPricePlusFee: "",
    OrderReference: null,
    ReferenceCode: "",
    PaymentTimeStamp: "",
    TransactionStatus: "",
    Platform: "ios",
    TransactionDetails: null,
    ShippingDetails: null,
    ProductOrders: [],
  });

  const [lightingData, setLightingData] = useState<lightingDataType>({
    BiggerSpace: null,
    SmallerSpace: null,
    PrimaryColor: null,
    SecondaryColor: null,
    FloorColor: null,
    FurnitureColor: null,
    SpaceHeight: null,
    Area: 0,
    DiningSeater: null,
    Skip: null,
  });

  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [facebookAuthLoading, setFacebookAuthLoading] = useState(false);
  const [userSignInDetailsFormData, setUserSignInDetailsFormData] = useState(
    new URLSearchParams()
  );

  // Google Auth
  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    iosClientId,
    webClientId,
    clientId: webClientId,
    responseType: "token",
  });

  // Facebook Auth - Simplified config without iosUseNative
  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    clientId: facebookAppId,
    redirectUri: makeRedirectUri({
      scheme: `fb${facebookAppId}`,
      path: 'facebook-auth'
    }),
  });

  useEffect(() => {
    const handleGoogleAuthResponse = async (authResponse: AuthSessionResult) => {
      if (authResponse?.type === "success") {
        const { params } = authResponse;
        if (params.access_token) {
          await handleGoogleAuth(params.access_token);
        }
      } else if (authResponse?.type === "error") {
        console.error("Google auth error:", authResponse.error);
        Alert.alert("Error", "Failed to authenticate with Google");
        setGoogleAuthLoading(false);
      }
    };

    if (googleResponse) {
      handleGoogleAuthResponse(googleResponse);
    }
  }, [googleResponse]);

  useEffect(() => {
    const handleFacebookAuthResponse = async (authResponse: AuthSessionResult) => {
      if (authResponse?.type === "success") {
        const { authentication } = authResponse;
        if (authentication?.accessToken) {
          await handleFacebookAuth(authentication.accessToken);
        }
      } else if (authResponse?.type === "error") {
        console.error("Facebook auth error:", authResponse.error);
        Alert.alert("Error", "Failed to authenticate with Facebook");
        setFacebookAuthLoading(false);
      }
    };

    if (facebookResponse) {
      handleFacebookAuthResponse(facebookResponse);
    }
  }, [facebookResponse]);

  const handleGoogleAuth = async (accessToken: string) => {
    setGoogleAuthLoading(true);
    try {
      const userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Google");
      }

      const userInfo = await userInfoResponse.json();

      const subFormData = new URLSearchParams();
      subFormData.append("username", userInfo.email);
      subFormData.append("grant_type", "google");
      subFormData.append("name", userInfo.name || "");

      setUserSignInDetailsFormData(subFormData);

      await signInHandler();

      await storeAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL, userInfo.email);
      handleGetuserByEmail(userInfo.email);
    } catch (error) {
      console.error("Google auth error:", error);
      Alert.alert("Error", "Failed to authenticate with Google");
    } finally {
      setGoogleAuthLoading(false);
    }
  };

  const handleFacebookAuth = async (accessToken: string) => {
    setFacebookAuthLoading(true);
    try {
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/v12.0/me?fields=id,name,email&access_token=${accessToken}`
      );

      if (!userInfoResponse.ok) {
        throw new Error("Failed to fetch user info from Facebook");
      }

      const userInfo = await userInfoResponse.json();

      if (!userInfo.email) {
        throw new Error('Failed to get email from Facebook');
      }

      const subFormData = new URLSearchParams();
      subFormData.append("username", userInfo.email);
      subFormData.append("grant_type", "facebook");
      subFormData.append("name", userInfo.name || "");

      setUserSignInDetailsFormData(subFormData);

      await signInHandler();

      await storeAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL, userInfo.email);
      handleGetuserByEmail(userInfo.email);
    } catch (error) {
      console.error("Facebook auth error:", error);
      Alert.alert("Error", "Failed to authenticate with Facebook");
    } finally {
      setFacebookAuthLoading(false);
    }
  };

  const signInWithGoogle = async (options?: AuthRequestPromptOptions) => {
    try {
      setGoogleAuthLoading(true);
      await googlePromptAsync(options);
    } catch (error) {
      console.error("Google prompt error:", error);
      setGoogleAuthLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    try {
      setFacebookAuthLoading(true);
      await facebookPromptAsync();
    } catch (error) {
      console.error("Facebook prompt error:", error);
      setFacebookAuthLoading(false);
    }
  };

  const handleGetuserByEmail = (email: string) => {
    requestHandler({
      url: `/api/user/getUserByEmail?email=${email}`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        setUser(res?.data?.SingleResult);
      },
    });
  };

  const signInHandler = async () => {
    requestHandler({
      url: "api/security/token",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      state: requestState,
      setState: setRequestState,
      data: userSignInDetailsFormData?.toString(),
      successFunction(res) {
        const email = userSignInDetailsFormData.get("username");
        if (email) {
          storeAsyncData(LOCAL_STORAGE_AUTH_KEY_NAME, res?.data?.access_token);
          storeAsyncData(LOCAL_STORAGE_AUTH_NEW_USER, "false");
          handleGetuserByEmail(email);
          storeAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL, email);
          router.push("/dashboard");
        }
      },
      errorFunction(err) {
        Alert.alert("Error", (err?.response?.data as any)?.error);
      },
    });
  };

  useEffect(() => {
    const fetchStoredEmail = async () => {
      try {
        const data = await getAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL);
        if (data) {
          handleGetuserByEmail(data as string);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    };

    fetchStoredEmail();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        handleGetuserByEmail,
        orderItem,
        setOrderItem,
        signInWithGoogle,
        signInWithFacebook,
        googleAuthLoading,
        facebookAuthLoading,
        lightingData,
        setLightingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;