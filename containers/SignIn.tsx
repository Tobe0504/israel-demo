import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { useContext, useEffect, useState } from "react";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import {
  LOCAL_STORAGE_AUTH_KEY_NAME,
  LOCAL_STORAGE_AUTH_NEW_USER,
  LOCAL_STORAGE_AUTH_USER_EMAIL,
  LOCAL_STORAGE_REDIRECT_ROUTE,
} from "@/utils/constants";
import { getAsyncData, storeAsyncData } from "@/helpers/asyncStorageHandlers";
import { AuthContext } from "@/context/AuthContext";
import AuthHeader from "./AuthHeader";

export const unstable_settings = {
  header: () => <AuthHeader />,
};

const SignIn = () => {
  // Router
  const router = useRouter();

  // States
  const [userSignInDetails, setUserSignInDetails] = useState({
    username: "",
    password: "",
    grant_type: "password",
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [userSignInDetailsFormData, setUserSignInDetailsFormData] = useState(
    new URLSearchParams()
  );

  // Context
  const {
    handleGetuserByEmail,
    signInWithGoogle,

    // handleFacebookAuth
  } = useContext(AuthContext);

  // Requests
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
        handleGetuserByEmail(userSignInDetails?.username);
        storeAsyncData(LOCAL_STORAGE_AUTH_KEY_NAME, res?.data?.access_token);
        storeAsyncData(LOCAL_STORAGE_AUTH_NEW_USER, "false");
        storeAsyncData(
          LOCAL_STORAGE_AUTH_USER_EMAIL,
          userSignInDetails?.username
        );

        const rerouteToStoredRoute = async () => {
          try {
            const data = await getAsyncData(LOCAL_STORAGE_REDIRECT_ROUTE);
            if (data && data !== "/sign-in") {
              router.push(data as any);
            } else {
              router.push("/dashboard");
            }
          } catch (error) {
            router.push("/dashboard");
          }
        };

        rerouteToStoredRoute();
      },
      errorFunction(err) {
        Alert.alert("Error", (err?.response?.data as any)?.error, [
          { text: "Okay", onPress: () => router.push("/sign-in") },
        ]);
      },
    });
  };

  // Effects
  useEffect(() => {
    if (userSignInDetails) {
      const subFormData = new URLSearchParams();

      subFormData.append("username", userSignInDetails?.username);
      subFormData.append("password", userSignInDetails?.password);
      subFormData.append("grant_type", userSignInDetails?.grant_type);

      setUserSignInDetailsFormData(subFormData);
    }
  }, [userSignInDetails]);

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerText}>
            Welcome to TheLightingHaus
          </ThemedText>
          <ThemedText type="default">
            Continue shopping for premium lighting products.
          </ThemedText>
        </View>

        <View>
          <CustomInput
            label="Email"
            type="email-address"
            value={userSignInDetails?.username}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignInDetails, "username");
            }}
          />
          <CustomInput
            label="Password"
            type="visible-password"
            value={userSignInDetails?.password}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignInDetails, "password");
            }}
          />
          <CustomButton
            text="Sign In"
            type="secondary"
            onPress={() => {
              signInHandler();
            }}
            disabled={
              !userSignInDetails?.username || !userSignInDetails?.password
            }
            loading={requestState?.isLoading}
          />
        </View>

        <View style={styles.alternative}>
          <Text style={styles.altText}>Or Sign Up using</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Facebook"
              style={{ backgroundColor: "#4267B2", flex: 1 }}
              color="#fff"
              // onPress={handleFacebookAuth}
            />
            <CustomButton
              text="Google"
              style={{ backgroundColor: "#EA4235", flex: 1 }}
              onPress={() => signInWithGoogle()}
            />
          </View>
        </View>

        <Text style={styles.altNav}>
          Forgot Password?
          <Link
            href="/reset-password"
            style={{ fontFamily: "PoppinsMedium", fontWeight: "500" }}
          >
            {" "}
            Reset here.{" "}
          </Link>
        </Text>

        <Text style={[styles.altNav, styles.altNav2]}>
          Don't have an account?{" "}
          <Link
            href="/sign-up"
            style={{ fontFamily: "PoppinsMedium", fontWeight: "500" }}
          >
            {" "}
            Sign Up here.{" "}
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: 100,
  },

  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "white",
  },

  header: {
    width: 234,
    marginBottom: 32,
  },

  headerText: {
    marginBottom: 6,
  },

  alternative: {
    paddingBlock: 24,
    borderTopColor: "#000",
    borderBottomColor: "#000",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBlock: 32,
  },

  altText: {
    fontFamily: "PoppinsThin",
    textAlign: "center",
    marginBottom: 23,
  },

  buttonContainer: {
    flexDirection: "row",
    gap: 16,
  },

  altNav: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },

  altNav2: {
    marginBottom: 100,
  },
});

export default SignIn;
