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
import { verifyTransaction } from "@/services/services";

const PaystackPaymentScreen = () => {
  // Env
  const { paystack_public_key }: any = Constants?.expoConfig?.extra;

  // Context
  const { user, orderItem, orderItemHandler, setOrderItem } =
    useContext(AuthContext);

  // States
  const [verifyRequestState, setVerifyRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Router
  const router = useRouter();

  // Hooks
  const { showToast } = useToast();
  const { handleError } = useError();

  // Env

  // Requests
  const verifyPayment = async (reference: string) => {
    setVerifyRequestState((prevState) => {
      return { ...prevState, isLoading: true };
    });

    try {
      const res = await verifyTransaction(reference);

      if (res) {
        orderItemHandler();

        setOrderItem((prevState) => {
          return {
            ...prevState,
            ReferenceCode: res?.data?.data?.reference,
            PaymentTimeStamp: res?.data?.data?.transaction_date,
          };
        });
      }
    } catch (error) {
      handleError(error as any);
    } finally {
      setVerifyRequestState((prevState) => {
        return { ...prevState, isLoading: false };
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey={paystack_public_key}
        amount={Number(orderItem.TotalPricePlusFee)}
        billingEmail={user?.Email as string}
        activityIndicatorColor="green"
        onSuccess={(res) => {
          verifyPayment(res?.data?.transactionRef?.reference);
          setOrderItem((prevstate) => {
            return {
              ...prevstate,
              TransactionRef: res?.data?.transactionRef?.reference,
              PaymentTimeStamp: getTodaysDate(),
              TransactionStatus: res?.data?.event,
            };
          });
          showToast(
            "Payment Successful!",
            "Your Payment was made successfully",
            "success"
          );
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
