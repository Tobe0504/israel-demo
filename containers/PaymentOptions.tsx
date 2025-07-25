import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { activeToggler } from "@/helpers/activeToggler";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { paymentMethodTypes, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import Constants from "expo-constants";
import useToast from "@/hooks/useToast";
import { AuthContext } from "@/context/AuthContext";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import { LOCAL_STORAGE_BASE_CURRENCY } from "@/utils/constants";
import {
  verifyFlutterwaveTransaction,
  verifyTransaction,
} from "@/services/services";
import { getTodaysDate } from "@/helpers/datehandlers";
import { logger } from "react-native-logs";
import { generateRandomId } from "@/helpers/generateRandomId";

const PaymentOptions = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [paymentMethods, setPaymentMethods] = useState<paymentMethodTypes[]>(
    []
  );
  const [currency, setCurrency] = useState("");

  // Context
  const { orderItem, user, setOrderItem, orderItemHandler } =
    useContext(AuthContext);

  // Env
  const { flutterwave_public_key }: any = Constants?.expoConfig?.extra;

  // Router
  const router = useRouter();

  // Hooks
  const { handleError } = useError();
  const { showToast } = useToast();

  const log = logger.createLogger();

  // Requests

  const getPaymentProviders = () => {
    requestHandler({
      url: "api/paymentoption/getAvailablePaymentOptions?platform=ios",
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const verifyPayment = async (reference: string) => {
    try {
      const res = await verifyFlutterwaveTransaction(reference);

      if (res) {
        orderItemHandler();

        setOrderItem((prevState) => {
          return {
            ...prevState,
            ReferenceCode: res?.data?.tx_ref,
            PaymentTimeStamp: res?.data?.created_at,
          };
        });
      }
    } catch (error) {
      log.debug(JSON.stringify(error), "Validate error");
      handleError(error as any);
    } finally {
    }
  };

  //   Utils
  const activePaymentMethod: paymentMethodTypes | undefined = useMemo(
    () => paymentMethods?.find((data: any) => data?.isActive),
    [paymentMethods]
  );

  const getCurrency = async () => {
    const exchangeRate = await getAsyncData(LOCAL_STORAGE_BASE_CURRENCY);
    const parsedExchangeRate = JSON.parse(exchangeRate as string);

    setOrderItem((prevState) => {
      return {
        ...prevState,
        ConversionRate: parsedExchangeRate?.Value,
        Currency: parsedExchangeRate?.Currency,
      };
    });
  };

  //   Efffects
  useEffect(() => {
    if (requestState?.data) {
      const newPaymentMethods = requestState?.data?.Result?.map((data: any) => {
        return { ...data, isActive: false };
      });

      setPaymentMethods(newPaymentMethods);
    }
  }, [requestState?.data]);

  useEffect(() => {
    getCurrency();
    getPaymentProviders();
  }, []);

  useEffect(() => {
    if (activePaymentMethod) {
      setOrderItem((prevState) => {
        return {
          ...prevState,
          PaymentGateway: activePaymentMethod?.Name,
        };
      });
    }
  }, [activePaymentMethod]);

  return (
    <View style={{ padding: 32, backgroundColor: "#fff", flex: 1 }}>
      <View style={{ flex: 1, height: "90%" }}>
        <ThemedText style={{ marginBottom: 32 }}>
          Kindly choose a mode of payment, you would be redirected to a secured
          payment page so you could complete your payment
        </ThemedText>

        {requestState?.isLoading ? (
          <Loader />
        ) : (
          <>
            {paymentMethods?.map((data: any, i: number) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    marginBottom: 24,
                    borderRadius: 5,
                    backgroundColor: data?.isActive ? "#FFCA05" : "#fff",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                  }}
                  onPress={() => {
                    activeToggler(i, paymentMethods, setPaymentMethods);
                  }}
                >
                  <Image
                    source={{ uri: generateImageURL(data?.ImageUrl) }}
                    style={{
                      width: "50%",
                      height: 40,
                      objectFit: "contain",
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>

      {(activePaymentMethod as paymentMethodTypes)?.Name?.toLowerCase() ===
        "flutterwave" && (
        <PayWithFlutterwave
          onRedirect={(res) => {
            verifyPayment(res?.transaction_id);
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
          onInitializeError={() => {
            showToast(
              "Payment Unsuccessful!",
              "Your Payment did not go through",
              "error"
            );
            router.back();
          }}
          onAbort={() => {
            showToast(
              "Payment Cancelled!",
              "Your Payment did not go through",
              "error"
            );
          }}
          options={{
            amount: Number(orderItem?.TotalPricePlusFee) || 200,
            authorization: flutterwave_public_key,
            tx_ref: generateRandomId(),
            payment_options:
              "card,account,ussd,banktransfer,mpesa,barter,qr,bank",
            customer: {
              email: user?.Email as string,
              phonenumber: user?.PhoneNumber,
              name: user?.Name,
            },
            currency: orderItem?.Currency as any,
          }}
          customButton={(props) => (
            <CustomButton
              text="Proceed with Flutterwave"
              type="secondary"
              disabled={!activePaymentMethod}
              onPress={() => {
                props.onPress();
              }}
            />
          )}
        />
      )}

      {(activePaymentMethod as paymentMethodTypes)?.Name?.toLowerCase() ===
        "paystack" && (
        <CustomButton
          text="Proceed with Paystack"
          type="secondary"
          disabled={!activePaymentMethod}
          onPress={() => {
            if (activePaymentMethod) {
              if (activePaymentMethod?.Name === "Paystack") {
                router.push("/paystack");
              }
            }
          }}
        />
      )}

      {(activePaymentMethod as paymentMethodTypes)?.Name?.toLowerCase() ===
        "interswitch" && (
        <CustomButton
          text="Proceed with Interswitch"
          type="secondary"
          disabled={!activePaymentMethod}
          onPress={() => {
            if (activePaymentMethod) {
              if (activePaymentMethod?.Name === "Interswitch") {
                router.push("/interswitch");
              }
            }
          }}
        />
      )}
    </View>
  );
};

export default PaymentOptions;
