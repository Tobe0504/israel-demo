import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";
import { dropdownOptionsType } from "@/utils/types";

type CustomDropdownTypes = ViewProps & {
  title?: String;
  options?: dropdownOptionsType[];
  state?: string;
  setState?: Dispatch<SetStateAction<string>>;
  label?: string;
};

const CustomDropdown = ({
  title,
  options,
  state,
  setState,
  label,
  ...rest
}: CustomDropdownTypes) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 0,
        marginBottom: 16,
      }}
    >
      <ThemedText style={{ marginBottom: 10 }}>{label}</ThemedText>

      <RNPickerSelect
        onValueChange={(value) => {
          setState && setState(value);
        }}
        darkTheme={true}
        placeholder={{ label, value: null }}
        items={options || []}
        doneText="Done"
        style={{
          inputIOS: {
            color: "black",
            padding: 10,
            backgroundColor: "white",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#000",
            height: 48,
          },
          placeholder: {
            color: "#ccc",
            fontSize: 16,
          },
          iconContainer: {
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            width: "100%",
            paddingRight: 10,
          },
        }}
        Icon={() => (
          <View pointerEvents="none">
            <Ionicons name="chevron-down" size={20} color="gray" />
          </View>
        )}
      />
    </View>
  );
};

export default CustomDropdown;
