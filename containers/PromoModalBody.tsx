import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

type PromoModalBodyTypes = {
  onClose: () => void;
};

const PromoModalBody = ({ onClose }: PromoModalBodyTypes) => {
  // Router
  const router = useRouter();

  return (
    <View style={{ width: 348 }}>
      <Image
        source={require("../assets/images/promoBody.png")}
        style={{ width: "100%", height: 149 }}
      />

      <View style={{ paddingVertical: 50, paddingHorizontal: 32 }}>
        <ThemedText type="defaultSemiBold" style={{ marginBottom: 20 }}>
          Be the first to know
        </ThemedText>
        <ThemedText style={{ marginBottom: 20 }}>
          The 2020 design bed side lamps now available.
        </ThemedText>
        <ThemedText style={{ marginBottom: 20 }}>
          Get all items at 20% discount when you use the the discount code
          COVID2020.
        </ThemedText>
        <ThemedText style={{ marginBottom: 20 }}>Stay Safe. </ThemedText>

        <CustomButton
          text="Start Shopping"
          type="secondary"
          style={{ marginVertical: 20 }}
          onPress={() => {
            router.push("/products");
            onClose();
          }}
        />
        <CustomButton text="Dismiss" type="null" onPress={onClose} />
      </View>
    </View>
  );
};

export default PromoModalBody;
