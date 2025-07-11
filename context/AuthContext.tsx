import { getAsyncData, storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import { LOCAL_STORAGE_AUTH_USER_EMAIL } from "@/utils/constants";
import {
  filterContextType,
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
import useError from "@/hooks/useError";
import { useRouter } from "expo-router";
import useToast from "@/hooks/useToast";
// import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
// import {
//   AccessToken,
//   Settings,
//   Profile,
//   LoginManager,
// } from "react-native-fbsdk-next";

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
  orderItemHandler: () => void;
  orderItemState: requestType;
  productsFilterData: filterContextType;
  setProductsFilterData: Dispatch<SetStateAction<filterContextType>>;
  // handleFacebookAuth: () => void;
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
  const [productsFilterData, setProductsFilterData] =
    useState<filterContextType>({
      ProductTypes: "",
      DesignTypes: "",
      SpaceType: "",
      ColorTypes: "",
      HeightTypes: "",
      MaximumPrice: 0,
      MinimumPrice: 0,
      SpaceID: 0,
      IsFeatured: false,
      Skip: 70,
    });

  const [userSignInDetailsFormData, setUserSignInDetailsFormData] = useState(
    new URLSearchParams()
  );
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);

  // Hooks
  const { handleError } = useError();
  const { showToast } = useToast();

  // Router
  const router = useRouter();

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

  // Facebook Auth
  // const handleFacebookAuth = () => {
  //   LoginManager.logInWithPermissions(["public_profile", "email"]).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log("==> Login cancelled");
  //       } else {
  //         console.log(result);
  //         AccessToken.getCurrentAccessToken().then((data) => {
  //           console.log(data);
  //           getUserFBData();
  //         });
  //       }
  //     },
  //     function (error) {
  //       console.log("==> Login fail with error: " + error);
  //     }
  //   );
  // };

  // const getUserFBData = () => {
  //   Profile.getCurrentProfile().then((currentProfile) => {
  //     console.log(currentProfile);
  //   });
  // };

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
          storeAsyncData(LOCAL_STORAGE_AUTH_USER_EMAIL, email);
        }
      },
      errorFunction(err) {
        Alert.alert("Error", (err?.response?.data as any)?.error);
      },
    });
  };

  const orderItemHandler = () => [
    requestHandler({
      url: "api/order/insertNewTransaction",
      data: orderItem,
      method: "POST",
      state: orderItemState,
      setState: setOrderItemState,
      successFunction(res) {
        router.push("/order-success");

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

        showToast(
          "Order has been placed successfully",
          "You will get an email regarding your order soon",
          "success"
        );
      },
      errorFunction(err) {
        handleError(err);
        console.log(err?.response, "Order failed");
      },
    }),
  ];

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

    // const requestTracking = async () => {
    //   const { status } = await requestTrackingPermissionsAsync();

    //   Settings.initializeSDK();

    //   if (status === "granted") {
    //     await Settings.setAdvertiserTrackingEnabled(true);
    //   }
    // };

    // requestTracking();
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
        orderItemHandler,
        orderItemState,
        productsFilterData,
        setProductsFilterData,
        // handleFacebookAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
