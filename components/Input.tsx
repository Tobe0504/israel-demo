import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type CustomInputProps = {
  type?:
    | "phone-pad"
    | "numeric"
    | "email-address"
    | "decimal-pad"
    | "url"
    | "visible-password";
  label?: string;
  onChange?: ((text: string) => void) | undefined;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  style?: React.CSSProperties;
  name?: string;
  condition?: boolean;
  readOnly?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  loading?: boolean;
  maxLength?: number;
  isBordered?: boolean;
};

const CustomInput = ({
  type,
  label,
  onChange,
  value,
  isRequired,
  placeholder,
  isBordered,
}: CustomInputProps) => {
  // States
  const [isFocused, setIsFocused] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <>
          <Text style={styles.label}>{label}</Text>
          {isRequired && <Text>*</Text>}
        </>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          style={[
            !isBordered ? styles.input : styles.borderedInput,
            isFocused && !isBordered
              ? styles.focused
              : isFocused && isBordered
              ? styles.focusedBordered
              : undefined,
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={type || "default"}
          secureTextEntry={type === "visible-password" && !passwordIsVisible}
        />

        {type === "visible-password" && (
          <MaterialIcons
            name={passwordIsVisible ? "visibility-off" : "visibility"}
            style={styles.icon}
            size={18}
            onPress={() => setPasswordIsVisible((prevState) => !prevState)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: "black",
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: 400,
    marginBottom: 8,
    lineHeight: 18,
  },

  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },

  icon: {
    position: "absolute",
    right: 0,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "green",
    paddingBlock: 8,
    color: "#000",
    borderBottomColor: "#000",
  },

  borderedInput: {
    borderWidth: 1,
    paddingBlock: 16,
    paddingHorizontal: 16,
    color: "#000",
    borderColor: "#000",
    borderRadius: 5,
  },

  focused: {
    borderBottomColor: "#F4811F",
    color: "#F4811F",
  },

  focusedBordered: {
    borderColor: "#F4811F",
    color: "#F4811F",
  },
});

export default CustomInput;
