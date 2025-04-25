import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  type ViewProps,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Feather, Ionicons } from "@expo/vector-icons";
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
  // States
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSelectOption = (selected: dropdownOptionsType) => {
    if (setState) {
      setState(selected?.value);
      setSelectedOption(selected?.label);
    }
    setShowDropdown(false);
  };
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

      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.selectContainer]}
          onPress={toggleDropdown}
          activeOpacity={0.8}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ThemedText
              style={state ? styles.selectText : styles.selectPlaceholder}
            >
              {title || selectedOption || "Select an option"}
            </ThemedText>
          </View>
          <Feather
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdown}>
            {options?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => handleSelectOption(item)}
              >
                <ThemedText style={styles.dropdownItemText}>
                  {item?.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#374151",
    fontFamily: "InterRegular",
  },
  selectContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    backgroundColor: "#fff",
    height: 48,
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  selectText: {
    fontSize: 16,
    color: "#1f2937",
    fontFamily: "InterRegular",
  },
  selectPlaceholder: {
    fontSize: 16,
    color: "#9ca3af",
    fontFamily: "InterRegular",
  },
  inputError: {
    borderColor: "#ef4444",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginTop: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#1F2937",
    fontFamily: "InterRegular",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "InterRegular",
  },
});

export default CustomDropdown;
