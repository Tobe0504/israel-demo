import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type FeedbackTypes = {
  title: string;
  caption: string;
  buttonText: string;
  onPress?: () => void;
  type: "success" | "error";
  icon: any;
};

const Feedback = ({
  title,
  caption,
  buttonText,
  onPress,
  type,
  icon,
}: FeedbackTypes) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        backgroundColor: "#fff",
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={50}
        style={{ marginBlock: 32 }}
        color={type === "success" ? "green" : "red"}
      />
      <ThemedText
        type="title"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        {title}
      </ThemedText>
      <ThemedText
        style={{ textAlign: "center", marginBottom: 40, width: "70%" }}
      >
        {caption}
      </ThemedText>
      <CustomButton
        type="secondary"
        text={buttonText}
        onPress={onPress}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default Feedback;
