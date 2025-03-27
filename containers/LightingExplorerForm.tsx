import CustomButton from "@/components/CustomButton";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/Input";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Keyboard, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const LightingExplorerForm = () => {
  // Router
  const router = useRouter();

  // States
  const [lightingData, setLightingData] = useState({
    BiggerSpace: 1,
    SmallerSpace: 18,
    PrimaryColor: 1,
    SecondaryColor: 1,
    FloorColor: 0,
    FurnitureColor: 0,
    SpaceHeight: 0,
    Area: 0,
    DiningSeater: 0,
    Skip: 0,
  });

  return (
    <TouchableWithoutFeedback onPress={() => [Keyboard.dismiss()]}>
      <>
        <View style={{ paddingBottom: 24 }}>
          <CustomDropdown label="Select Space" options={["Home", "Office"]} />
          <CustomDropdown
            label="Select Category"
            options={["Home", "Office"]}
          />
          <CustomInput
            label="Colour of walls"
            isBordered
            placeholder="White"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Accent (secondary) colour"
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Floor colour"
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Furniture colour"
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Ceiling to floor height "
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Number of seaters (Dining Light)"
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />
          <CustomInput
            label="Total space area (LxB in meters)"
            isBordered
            placeholder="Grey"
            style={{ marginBottom: 18 }}
          />

          <CustomButton
            onPress={() => {
              router.push("/lighting-explorer/suggestions");
            }}
            text="Xplore TLH Showroom"
            type="secondary"
          />
        </View>
      </>
    </TouchableWithoutFeedback>
  );
};

export default LightingExplorerForm;
