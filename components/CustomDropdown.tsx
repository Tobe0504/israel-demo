import { Ionicons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  type ViewProps,
} from "react-native";
import { ThemedText } from "./ThemedText";

type CustomDropdownTypes = ViewProps & {
  title?: String;
  options: string[];
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
  const [isActive, setIsActive] = useState(false);
  const rotation = useState(new Animated.Value(0))[0];

  //   Effects
  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isActive ? -90 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isActive, rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 90],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <View {...rest}>
      <View style={{ position: "relative" }}>
        {label && <ThemedText style={{ marginBottom: 18 }}>{label}</ThemedText>}
        <TouchableWithoutFeedback
          onPress={() => {
            if (options?.length > 0) {
              setIsActive((prevState) => !prevState);
            }
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderWidth: 1,
              borderColor: "#000",
              padding: 16,
              borderRadius: 5,
            }}
          >
            <ThemedText>{title || state || "Select"}</ThemedText>
            <Animated.View
              style={[{ transform: [{ rotate: rotateInterpolation }] }]}
            >
              <Ionicons name="chevron-down-outline" size={20} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            borderWidth: 1,
            borderColor: "#000",
            borderRadius: 5,
            position: "absolute",
            width: "100%",
            top: "110%",
            maxHeight: isActive ? 200 : 0,
            display: isActive ? "flex" : "none",
            backgroundColor: "#fff",
            zIndex: 10,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
          }}
        >
          <View
            style={{
              padding: 16,
            }}
          >
            {options?.map((data) => {
              return (
                <TouchableOpacity>
                  <ThemedText
                    style={{ marginBottom: 8 }}
                    onPress={() => {
                      if (setState) setState(data);
                    }}
                  >
                    Me
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CustomDropdown;
