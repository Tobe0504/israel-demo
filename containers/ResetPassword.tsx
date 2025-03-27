import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import CustomInput from "@/components/Input";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import { useState } from "react";
import { requestType } from "@/utils/types";
import { requestHandler } from "@/helpers/requestHandler";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import useError from "@/hooks/useError";
import { AxiosError } from "axios";

const ResetPassword = () => {
  // Router
  const router = useRouter();

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [email, setEmail] = useState("");

  // Hooks
  const { handleError } = useError();

  // Requests
  const handleSendResetEmail = () => {
    requestHandler({
      url: `api/user/verifyUserAndResetEmail`,
      method: "POST",
      state: requestState,
      setState: setRequestState,
      successFunction() {
        router.push("/reset-password/database-success");
      },
      errorFunction(err) {
        handleError(err);
        router.push("/reset-password/database-failure");
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          Need help with your password?
        </ThemedText>
        <ThemedText type="default">
          Enter your email and we’ll send you a password reset link.
        </ThemedText>
      </View>

      <View>
        <CustomInput
          label="Email"
          type="email-address"
          value={email}
          onChange={(e) => inputChangeHandler(e, setEmail, "email", true)}
        />
        <CustomButton
          text="Next"
          type="secondary"
          disabled={!email}
          onPress={() => handleSendResetEmail()}
          loading={requestState?.isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "relative",
    height: 100,
    flex: 1,
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
});

export default ResetPassword;
