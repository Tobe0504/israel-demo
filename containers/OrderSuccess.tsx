import CustomButton from "@/components/CustomButton";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { View } from "react-native";

const OrderSuccess = () => {
  // Context
  const { orderItemState } = useContext(AuthContext);

  //   Router
  const router = useRouter();

  if (orderItemState?.isLoading) {
    <Loader />;
  }

  const successContainer = (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <View
        style={{
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFCA05",
          borderRadius: 5,
          marginBottom: 16,
        }}
      >
        <Ionicons name="checkmark-circle-outline" size={50} color="#fff" />
      </View>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 16, width: "80%", textAlign: "center" }}
      >
        Items Ordered Successfully
      </ThemedText>
      <CustomButton
        type="secondary"
        text="Continue to explore"
        onPress={() => {
          router.replace("/dashboard");
        }}
      />
    </View>
  );

  const errorContainer = (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <View
        style={{
          width: 80,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFCA05",
          borderRadius: 5,
          marginBottom: 16,
        }}
      >
        <Ionicons name="close-circle-outline" size={50} color="#fff" />
      </View>
      <ThemedText
        type="subtitle"
        style={{ marginBottom: 16, width: "80%", textAlign: "center" }}
      >
        There was a problem completing this order
      </ThemedText>
      <CustomButton
        type="secondary"
        text="Go Back"
        onPress={() => {
          router.back();
        }}
      />
    </View>
  );

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      {orderItemState?.isLoading ? (
        <Loader />
      ) : orderItemState?.data === "" ? (
        successContainer
      ) : orderItemState?.error ? (
        errorContainer
      ) : null}
    </View>
  );
};

export default OrderSuccess;
