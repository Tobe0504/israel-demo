import { getAsyncData, storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from "@/utils/constants";
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
import {
  AuthRequestPromptOptions,
  AuthSessionResult,
  TokenResponse,
} from "expo-auth-session";
import Constants from "expo-constants";
import { Alert } from "react-native";

// Initialize WebBrowser
WebBrowser.maybeCompleteAuthSession();

// Get config from expo constants
const { googge_web_client: webClientId, google_ios_client_id: iosClientId } =
  Constants.expoConfig?.extra || {};

type AuthContextValuesTypes = {
  user: userType | null;
  handleGetuserByEmail: (email: string) => void;
  orderItem: productOrderType;
  setOrderItem: Dispatch<SetStateAction<productOrderType>>;
  signInWithGoogle: (options?: AuthRequestPromptOptions) => Promise<void>;
  googleAuthLoading: boolean;
  lightingData: lightingDataType;
  setLightingData: Dispatch<SetStateAction<lightingDataType>>;
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

  // States
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

  const orderItemHandler = () => [
    requestHandler({
      url: "api/order/insertNewTransaction",
      method: "POST",
      state: orderItemState,
      setState: setOrderItemState,
      successFunction(res) {
        setOrderItem({
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
      },
    }),
  ];

  console.log(user, "User");

  const [userSignInDetailsFormData, setUserSignInDetailsFormData] = useState(
    new URLSearchParams()
  );
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

  // Google Auth
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId,
    webClientId,
    clientId: webClientId,
    responseType: "token",
  });

  useEffect(() => {
    const handleAuthResponse = async (authResponse: AuthSessionResult) => {
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

    if (response) {
      handleAuthResponse(response);
    }
  }, [response]);

  const handleGoogleAuth = async (accessToken: string) => {
    setGoogleAuthLoading(true);
    try {
      // Get user info from Google
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

  const signInWithGoogle = async (options?: AuthRequestPromptOptions) => {
    try {
      await promptAsync(options);
    } catch (error) {
      console.error("Prompt error:", error);
      setGoogleAuthLoading(false);
    }
  };

  // Requests
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
          handleGetuserByEmail(email);
          storeAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL, email);
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
        googleAuthLoading,
        lightingData,
        setLightingData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
