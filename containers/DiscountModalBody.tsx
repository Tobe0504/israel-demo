import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Image, View } from "react-native";

type DiscountModalBodyTypes = {
  onClose: () => void;
};

const DiscountModalBody = ({ onClose }: DiscountModalBodyTypes) => {
  // Router
  const router = useRouter();

  return (
    <View style={{ width: 348 }}>
      <Image
        source={require("../assets/images/discount.png")}
        style={{ width: "100%", height: 149 }}
      />

      <View style={{ paddingVertical: 50, paddingHorizontal: 32 }}>
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 20 }}>
          Get 5% OFF when you sign up!
        </ThemedText>
        <ThemedText style={{ marginBottom: 20 }}>
          Register and enjoy 5% voucher off your first purchase.
        </ThemedText>

        <ThemedText style={{ marginBottom: 20 }}>Stay Safe. </ThemedText>

        <CustomButton
          text="Sign Up Now"
          type="secondary"
          style={{ marginVertical: 20 }}
          onPress={() => {
            router.push("/sign-up");
            onClose();
          }}
        />
        <CustomButton text="Dismiss" type="null" onPress={onClose} />
      </View>
    </View>
  );
};

export default DiscountModalBody;
