import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import AuthHeader from "./AuthHeader";
import { AuthContext } from "@/context/AuthContext";

const SignUp = () => {
  const { signInWithGoogle, signInWithFacebook } = useContext(AuthContext);

  // Utils
  const androidOrIos = Platform.OS === "ios" ? "IOS" : "Android";

  // States
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    Email: "",
    Name: "",
    Password: "",
    PhoneNumber: "",
    OnboardingDevice: androidOrIos,
    LoginType: "EmailAndPassword",
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  // Request
  const signUpHandler = () => {
    requestHandler({
      url: "api/user/insertUser",
      method: "POST",
      state: requestState,
      setState: setRequestState,
      data: userSignUpDetails,
      successFunction(res) {
        if (
          res?.data?.Message ===
          "User already have an account with this email. Account was created using EmailAndPassword"
        ) {
          Alert.alert(
            "Success",
            "An account has been created with this email. Please sign in instead",
            [{ text: "Sign In", onPress: () => router.push("/sign-in") }]
          );
        } else {
          Alert.alert(
            "Warning",
            "Account created successfully! Please sign in",
            [{ text: "Okay", onPress: () => router.push("/sign-in") }]
          );
        }
      },
      errorFunction(err) {
        Alert.alert("Error", (err?.response?.data as any)?.error, [
          { text: "Okay", onPress: () => router.push("/sign-in") },
        ]);
      },
    });
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.headerText}>
            Welcome to TheLightingHaus
          </ThemedText>
          <ThemedText type="default">
            Kindly create an account to get our showroom experience.
          </ThemedText>
        </View>

        <View>
          <CustomInput
            label="Full Name"
            placeholder="John Doe"
            value={userSignUpDetails?.Name}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignUpDetails, "Name");
            }}
          />
          <CustomInput
            label="Email"
            type="email-address"
            value={userSignUpDetails?.Email}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignUpDetails, "Email");
            }}
          />
          <CustomInput
            label="Password"
            type="visible-password"
            value={userSignUpDetails?.Password}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignUpDetails, "Password");
            }}
          />
          <CustomInput
            label="Phone Number"
            type="phone-pad"
            value={userSignUpDetails?.PhoneNumber}
            onChange={(e) => {
              inputChangeHandler(e, setUserSignUpDetails, "PhoneNumber");
            }}
          />
          <CustomButton
            text="Sign Up"
            type="secondary"
            disabled={
              !userSignUpDetails?.Email ||
              !userSignUpDetails?.PhoneNumber ||
              !userSignUpDetails?.Name ||
              !userSignUpDetails?.PhoneNumber
            }
            loading={requestState?.isLoading}
            onPress={() => {
              signUpHandler();
            }}
          />
        </View>

        <View style={styles.alternative}>
          <Text style={styles.altText}>Or Sign Up using</Text>
          <View style={styles.buttonContainer}>
            <CustomButton
              text="Facebook"
              style={{ backgroundColor: "#4267B2", flex: 1 }}
              color="#fff"
              onPress={() => signInWithFacebook()}
            />
            <CustomButton
              text="Google"
              style={{ backgroundColor: "#EA4235", flex: 1 }}
              color="#fff"
              onPress={() => signInWithGoogle()}
            />
          </View>
        </View>

        <Text style={styles.altNav}>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            style={{ fontFamily: "PoppinsMedium", fontWeight: "500" }}
          >
            {" "}
            Login here.{" "}
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
    marginBottom: 100,
  },
});

export default SignUp;
