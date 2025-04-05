import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ScrollView, Platform, View, Keyboard } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import CustomInput from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { TouchableWithoutFeedback } from "react-native";
import CustomDropdown from "@/components/CustomDropdown";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType, statesType } from "@/utils/types";
import Loader from "@/components/Loader";
import usePrice from "@/hooks/usePrice";
import { formatCurrency } from "@/helpers/formatAmount";
import useError from "@/hooks/useError";

const ShippingOptions = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [page, setPage] = useState("pickup");
  const [orderDetails, setOrderDetails] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
  });
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    error: null,
    data: null,
  });
  const [shippingFee, setShippingFee] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [price, setPrice] = useState("");
  const [priceWithoutCurrency, setPriceWithoutCurrency] = useState(0);
  const [addedPriceWithFee, setAddedPriceWithFee] = useState(0);

  // Context
  const { orderItem, setOrderItem, user } = useContext(AuthContext);

  const [state, setState] = useState("");

  //   Router
  const router = useRouter();

  // Hooks
  const { handleError } = useError();

  // Hooks
  const { returnExchangeRatedPrice, returnExchangeRateValueOnly } = usePrice();

  // Requests
  const getShippingOptionsStates = () => {
    requestHandler({
      url: `api/order/getShippingDestinations`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const calculateShippingFee = (stateId: string) => {
    requestHandler({
      url: `api/order/CalculateShippingFee?iks=1&ims=${stateId}`,
      method: "GET",
      state: shippingFee,
      setState: setShippingFee,
    });
  };

  // Utils
  const onChange = (selectedDate: any) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setPage("info");
    }
  };

  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setPrice(priceValue as string);
  };

  const getPriceWithoutCurrency = async (price: string | number) => {
    const priceValue = await returnExchangeRateValueOnly(price);

    setPriceWithoutCurrency(priceValue as number);
  };

  //   Context

  // Effects
  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
    } else {
      setOrderDetails((prevState) => {
        return {
          ...prevState,
          fullName: user?.Name,
          address: user?.Address,
          phone: user?.PhoneNumber,
          email: user?.Email,
        };
      });
    }
  }, [user]);

  useEffect(() => {
    if (date) {
      setOrderItem((prevState) => {
        return {
          ...prevState,
          PickupDate: String(date),
          UserId: user?.Id as number,
        };
      });
    }
  }, [date]);

  useEffect(() => {
    getShippingOptionsStates();
  }, []);

  useEffect(() => {
    if (state) {
      calculateShippingFee(state);
    }

    if (orderItem?.TotalPrice) {
      getPrice(orderItem?.TotalPrice);
      getPriceWithoutCurrency(orderItem?.TotalPrice);
    }
  }, [state, orderItem?.TotalPrice]);

  useEffect(() => {
    if (shippingFee?.data && priceWithoutCurrency) {
      const addedValue =
        shippingFee?.data?.SingleResult?.ShippingFee + priceWithoutCurrency;

      setAddedPriceWithFee(addedValue);

      if (addedValue) {
        setOrderItem((prevState) => {
          return {
            ...prevState,
            TotalPricePlusFee: addedValue,
            ShippingFee: shippingFee?.data?.SingleResult?.ShippingFee,
          };
        });
      }
    }
  }, [shippingFee, priceWithoutCurrency]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff", padding: 32 }}>
      {page === "pickup" ? (
        <>
          <ThemedText style={{ marginBottom: 8 }}>
            Please select a date for item pickup
          </ThemedText>

          <ThemedText style={{ marginBottom: 16 }}>
            Note: Items not picked up 3 days after selected date will attract
            daily storage charges.
          </ThemedText>

          <CustomButton
            text="Pickup Date"
            onPress={() => setShow((prevState) => !prevState)}
          />

          {show && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
              }}
            >
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onChange}
                textColor="#000"
                style={{
                  backgroundColor: "#000",
                  borderRadius: 5,
                  padding: 16,
                }}
                minimumDate={new Date()}
              />
            </View>
          )}
        </>
      ) : (
        <View>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <>
              <CustomInput
                label="Full Name"
                value={orderDetails?.fullName}
                onChange={(e) => {
                  inputChangeHandler(e, setOrderDetails, "fullName");
                }}
              />

              <CustomInput
                label="Address"
                value={orderDetails?.address}
                onChange={(e) => {
                  inputChangeHandler(e, setOrderDetails, "address");
                }}
              />

              <CustomInput
                label="Phone Number"
                value={orderDetails?.phone}
                onChange={(e) => {
                  inputChangeHandler(e, setOrderDetails, "phone");
                }}
              />

              <CustomInput
                label="Email Address"
                value={orderDetails?.email}
                onChange={(e) => {
                  inputChangeHandler(e, setOrderDetails, "email");
                }}
              />

              <CustomDropdown
                options={requestState?.data?.Result?.map((data: statesType) => {
                  return { label: data?.State, value: data?.Id };
                })}
                label="Delivery State"
                state={state}
                setState={setState}
              />

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 32,
                  paddingVertical: 8,
                  borderBottomWidth: 1,
                  borderBottomColor: "#000",
                  marginBottom: 8,
                }}
              >
                <ThemedText>Product Cost: </ThemedText>
                <ThemedText>{price}</ThemedText>
              </View>

              {shippingFee?.data && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: 32,
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: "#000",
                    marginBottom: 8,
                  }}
                >
                  <ThemedText>Shipping Fee: </ThemedText>
                  <ThemedText>
                    ₦
                    {formatCurrency(
                      shippingFee?.data?.SingleResult?.ShippingFee
                    )}{" "}
                  </ThemedText>
                </View>
              )}

              <CustomButton
                text={`Make Payment ${
                  addedPriceWithFee
                    ? `₦${formatCurrency(addedPriceWithFee)}`
                    : ""
                }`}
                type="secondary"
                onPress={() => router.push("/payment-options")}
                style={{ marginTop: 16 }}
                disabled={!price || !shippingFee?.data}
                loading={shippingFee?.isLoading}
              />
            </>
          </TouchableWithoutFeedback>
        </View>
      )}
    </ScrollView>
  );
};

export default ShippingOptions;
