import CustomButton from "@/components/CustomButton";
import CustomDropdown from "@/components/CustomDropdown";
import CustomInput from "@/components/Input";
import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import { inputChangeHandler } from "@/helpers/inputChangeHandler";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import useToast from "@/hooks/useToast";
import { ColorType, requestType } from "@/utils/types";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native";

const LightingExplorerForm = () => {
  // Router
  const router = useRouter();

  // Hooks
  const { handleError } = useError();

  // States
  const { lightingData, setLightingData } = useContext(AuthContext);

  const [spaceTypes, setSpaceTypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [colorTypes, setColorTypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [heightTypes, setHeightTypes] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [selectedSpaceType, setSelectedSpaceType] = useState("");
  const [selectedSubSpaceType, setSelectedSubSpaceType] = useState("");
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState("");
  const [selectedSecondaryColor, setSelectedSecondaryColor] = useState("");
  const [selectedFloorColor, setSelectedFloorColor] = useState("");
  const [selectedFurnitureColor, setSelectedFurnitureColor] = useState("");
  const [selectedHeightType, setSelectedHeightType] = useState("");

  const subSpace = useMemo(() => {
    if (selectedSpaceType) {
      return spaceTypes?.data?.Result?.find(
        (data: any) => data?.Id === Number(selectedSpaceType)
      )?.ChildSpaces;
    }
  }, [selectedSpaceType]);

  // Requests
  const getSpaceTypes = () => {
    requestHandler({
      url: "api/biggerSpace/getBiggerSpaces",
      method: "GET",
      state: spaceTypes,
      setState: setSpaceTypes,
      errorFunction(err) {
        handleError(err);
        router.back();
      },
    });
  };

  const getColorTypes = () => {
    requestHandler({
      url: "api/color/getColors",
      method: "GET",
      state: colorTypes,
      setState: setColorTypes,
      errorFunction(err) {
        handleError(err);
        router.back();
      },
    });
  };

  const getHeightTypes = () => {
    requestHandler({
      url: "api/heightType/getHeightTypes",
      method: "GET",
      state: heightTypes,
      setState: setHeightTypes,
      errorFunction(err) {
        handleError(err);
        router.back();
      },
    });
  };

  // Effects
  useEffect(() => {
    getSpaceTypes();
    getColorTypes();
    getHeightTypes();
  }, []);

  useEffect(() => {
    if (
      selectedSpaceType ||
      selectedSubSpaceType ||
      selectedPrimaryColor ||
      selectedSecondaryColor ||
      selectedFloorColor ||
      selectedFurnitureColor ||
      selectedHeightType
    ) {
      setLightingData((prevState) => {
        return {
          ...prevState,
          BiggerSpace: Number(selectedSpaceType),
          SmallerSpace: Number(selectedSubSpaceType),
          PrimaryColor: Number(selectedPrimaryColor),
          SecondaryColor: Number(selectedSecondaryColor),
          FloorColor: Number(selectedFloorColor),
          FurnitureColor: Number(selectedFurnitureColor),
          SpaceHeight: Number(selectedHeightType),
        };
      });
    }
  }, [
    selectedSpaceType,
    selectedSubSpaceType,
    selectedPrimaryColor,
    selectedSecondaryColor,
    selectedFloorColor,
    selectedFurnitureColor,
    selectedHeightType,
  ]);

  if (
    spaceTypes?.isLoading ||
    colorTypes?.isLoading ||
    heightTypes?.isLoading
  ) {
    return <Loader />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ paddingBlock: 24 }}
    >
      <TouchableWithoutFeedback onPress={() => [Keyboard.dismiss()]}>
        <>
          <View style={{ flex: 1, paddingBottom: 32 }}>
            <CustomDropdown
              label="Select Space"
              options={spaceTypes?.data?.Result?.map((data: any) => {
                return { label: data?.Name, value: data?.Id };
              })}
              setState={setSelectedSpaceType}
              state={selectedSpaceType}
            />
            <CustomDropdown
              label="Select Space within Space"
              options={subSpace?.map((data: any) => {
                return { label: data?.Space, value: data?.Id };
              })}
              state={selectedSubSpaceType}
              setState={setSelectedSubSpaceType}
            />
            <CustomDropdown
              label="Colour of walls (primary color)"
              options={colorTypes?.data?.Result?.map((data: ColorType) => {
                return { label: data?.Name, value: data?.Id };
              })}
              state={selectedPrimaryColor}
              setState={setSelectedPrimaryColor}
            />

            <CustomDropdown
              label="Accent (secondary) colour"
              options={colorTypes?.data?.Result?.map((data: ColorType) => {
                return { label: data?.Name, value: data?.Id };
              })}
              state={selectedSecondaryColor}
              setState={setSelectedSecondaryColor}
            />

            <CustomDropdown
              label="Floor colour"
              options={colorTypes?.data?.Result?.map((data: ColorType) => {
                return { label: data?.Name, value: data?.Id };
              })}
              state={selectedFloorColor}
              setState={setSelectedFloorColor}
            />
            <CustomDropdown
              label="Furniture colour"
              options={colorTypes?.data?.Result?.map((data: ColorType) => {
                return { label: data?.Name, value: data?.Id };
              })}
              state={selectedFurnitureColor}
              setState={setSelectedFurnitureColor}
            />
            <CustomDropdown
              label="Ceiling to floor height"
              options={heightTypes?.data?.Result?.map((data: ColorType) => {
                return { label: data?.Name, value: data?.Id };
              })}
              state={selectedHeightType}
              setState={setSelectedHeightType}
            />

            <CustomInput
              label="Total space area (LxB in meters)"
              isBordered
              placeholder="Grey"
              style={{ marginBottom: 18 }}
              value={String(lightingData?.Area as Number)}
              onChange={(e) => inputChangeHandler(e, setLightingData, "Area")}
            />

            <CustomButton
              onPress={() => {
                router.push("/lighting-explorer/products");
              }}
              text="Xplore TLH Showroom"
              type="secondary"
              disabled={
                !lightingData?.BiggerSpace ||
                !lightingData?.SmallerSpace ||
                !lightingData?.PrimaryColor ||
                !lightingData?.SecondaryColor ||
                !lightingData?.FloorColor ||
                !lightingData?.FurnitureColor ||
                !lightingData?.SpaceHeight
              }
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LightingExplorerForm;
