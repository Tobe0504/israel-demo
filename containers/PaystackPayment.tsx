import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import useError from "@/hooks/useError";
import useToast from "@/hooks/useToast";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const PaystackPaymentScreen = () => {
  // Env
  const { paystack_public_key }: any = Constants?.expoConfig?.extra;

  // Context
  const { user, orderItem } = useContext(AuthContext);

  //   Router
  const router = useRouter();

  // Hooks
  const { showToast } = useToast();

  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={paystack_public_key}
        amount={Number(orderItem.TotalPricePlusFee)}
        billingEmail={user?.Email as string}
        activityIndicatorColor="green"
        onSuccess={() => {
          showToast(
            "Payment Successful!",
            "Your Payment was made successfully",
            "success"
          );
          router.push("/dashboard");
        }}
        currency={orderItem?.Currency as any}
        onCancel={() => {
          showToast(
            "Payment Unsuccessful!",
            "Your Payment did not go through",
            "error"
          );
          router.back();
        }}
        autoStart={true}
      />
    </View>
  );
};

export default PaystackPaymentScreen;
