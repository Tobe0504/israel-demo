import { View } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import useError from "@/hooks/useError";
import useToast from "@/hooks/useToast";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { getTodaysDate } from "@/helpers/datehandlers";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utils/types";
import Loader from "@/components/Loader";

const PaystackPaymentScreen = () => {
  // Env
  const { paystack_public_key }: any = Constants?.expoConfig?.extra;

  // Context
  const { user, orderItem, orderItemHandler, setOrderItem } =
    useContext(AuthContext);

  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Router
  const router = useRouter();

  // Hooks
  const { showToast } = useToast();
  const { handleError } = useError();

  // Requests
  const verifyPayment = (reference: string) => {
    requestHandler({
      url: `https://api.paystack.co/transaction/verify/${reference}`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      requestCleanup: true,
      successFunction(res) {
        console.log(res, "Payment details");
      },
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {requestState?.isLoading ? (
        <Loader />
      ) : (
        <Paystack
          paystackKey={paystack_public_key}
          amount={Number(orderItem.TotalPricePlusFee)}
          billingEmail={user?.Email as string}
          activityIndicatorColor="green"
          onSuccess={(res) => {
            console.log(res, "The paystack response");
            setOrderItem((prevstate) => {
              return {
                ...prevstate,
                TransactionRef: res?.data?.transactionRef?.reference,
                PaymentTimeStamp: getTodaysDate(),
                TransactionStatus: res?.data?.event,
              };
            });
            verifyPayment(res?.data?.transactionRef?.reference);
            showToast(
              "Payment Successful!",
              "Your Payment was made successfully",
              "success"
            );
            // orderItemHandler();
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
      )}
    </View>
  );
};

export default PaystackPaymentScreen;
