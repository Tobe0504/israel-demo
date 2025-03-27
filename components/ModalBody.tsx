import React from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

type ModalBodyTypes = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalBody = ({ children, onClose }: ModalBodyTypes) => {
  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              maxWidth: "90%",
              minWidth: "50%",
              backgroundColor: "#fff",
              borderRadius: 5,
            }}
          >
            {children}
          </View>
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default ModalBody;
