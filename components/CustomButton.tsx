import React, { CSSProperties } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { ViewStyle } from "react-native";

type CustomButtonTypes = {
  onPress?: () => void;
  text: string;
  type?: "primary" | "secondary" | "null" | "delete";
  icon?: any;
  style?: ViewStyle;
  color?: string;
  iconColor?: string;
  loading?: boolean;
  disabled?: boolean;
};

export default function CustomButton({
  onPress,
  text,
  type,
  icon,
  style,
  iconColor,
  loading,
  disabled,
}: CustomButtonTypes) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "secondary"
          ? styles.secondary
          : type === "null"
          ? styles?.null
          : type === "delete"
          ? styles?.delete
          : styles.primary,
        { ...style },
      ]}
      onPress={() => {
        if (onPress && !disabled) onPress();
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="darkgray" />
      ) : (
        <>
          <Text
            style={[
              type === "secondary"
                ? styles.secondaryText
                : type === "null"
                ? styles.nullText
                : type === "delete"
                ? styles?.deleteText
                : styles.buttonText,
            ]}
          >
            {text}
          </Text>
          {icon && (
            <View style={styles.icon}>
              <Ionicons
                name={icon}
                size={24}
                color={
                  type === "secondary"
                    ? iconColor || "#fff"
                    : iconColor || "black"
                }
              />
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: 40,
    paddingBlock: 16,
    borderRadius: 5,
    gap: 9,
    maxHeight: "100%",
  },

  primary: {
    backgroundColor: "#FFCA05",
    color: "#000",
  },

  secondary: {
    backgroundColor: "#000",
  },

  null: {
    backgroundColor: "transparent",
  },

  delete: {
    backgroundColor: "#FF0000",
  },

  buttonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
  },

  nullText: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
  },

  secondaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },

  icon: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
