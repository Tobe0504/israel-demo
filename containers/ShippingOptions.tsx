import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import CustomInput from "@/components/Input";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";

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

  //   Router
  const router = useRouter();

  const onChange = (selectedDate: any) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      setPage("info");
    }
  };

  //   Context
  const { setOrderItem, user } = useContext(AuthContext);

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
        return { ...prevState, date };
      });
    }
  }, [date]);

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

          <CustomButton
            text={`Make Payment`}
            type="secondary"
            onPress={() => router.push("/payment-options")}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default ShippingOptions;
