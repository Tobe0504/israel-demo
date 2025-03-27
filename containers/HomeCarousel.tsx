import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { activeToggler } from "@/helpers/activeToggler";
import { routes } from "@/utils/routes";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export const unstable_settings = {
  headerShown: false,
};

const carouselElements = [
  {
    title: "Lighting Xplorer",
    caption:
      "Not sure of what you’re looking for? No worries! Set your preference in the Lighting Xplorer and we’ll show you what you can get.",
    image: require("../assets/images/carousel1.png"),
    isActive: false,
  },
  {
    title: "Select Product",
    caption:
      "Select preferred product, set product preference and proceed to checkout.",
    image: require("../assets/images/carousel2.png"),
    isActive: false,
  },
  {
    title: "Payment & Delivery",
    caption: "Pay with your bank card and order will be delivered to you.",
    image: require("../assets/images/carousel1.png"),
    isActive: false,
  },
];

const HomeCarousel = () => {
  // States
  const [carouselElementsState, setCarouselElementsState] =
    useState(carouselElements);
  const [activeIndex, setActiveIndex] = useState(0);

  // Router
  const router = useRouter();
  const navigation = useNavigation();

  // Effects
  useEffect(() => {
    if (activeIndex < carouselElements.length) {
      activeToggler(activeIndex, carouselElements, setCarouselElementsState);
    }
  }, [activeIndex]);

  const activeCarouselElement = carouselElementsState?.find(
    (data) => data?.isActive
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageAndTextSection}>
        <Image
          source={activeCarouselElement?.image}
          alt={activeCarouselElement?.title}
          style={styles.image}
        />
        <ThemedText type="title" style={styles.textHeader}>
          {activeCarouselElement?.title}
        </ThemedText>
        <ThemedText style={styles.textBody} type="default">
          {activeCarouselElement?.caption}
        </ThemedText>
      </View>
      <View>
        <View style={styles.carouselContainer}>
          <View style={styles.carouselDots}>
            {carouselElementsState?.map((data, i) => (
              <TouchableOpacity
                onPress={() =>
                  activeToggler(
                    i,
                    carouselElementsState,
                    setCarouselElementsState
                  )
                }
                key={i}
                style={data?.isActive ? styles.active : styles.inActive}
              >
                <View key={data?.title}></View>
              </TouchableOpacity>
            ))}
          </View>
          <CustomButton
            text="Get Started"
            icon="chevron-forward-outline"
            onPress={() => {
              router.push("/dashboard");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
    paddingBlock: 32,
    paddingInline: 32,
    backgroundColor: "#fff",
  },

  imageAndTextSection: {
    flexBasis: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },

  image: {
    marginInline: "auto",
    marginBottom: 50,
  },

  carouselContainer: {
    display: "flex",
    flexBasis: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  carouselDots: {
    display: "flex",
    gap: 12,
    flexDirection: "row",
  },

  carouselDot: {},

  active: {
    backgroundColor: "#000",
    width: 8,
    height: 8,
    borderRadius: "50%",
    borderBlockColor: "black",
    borderWidth: 1,
  },

  inActive: {
    backgroundColor: "none",
    width: 8,
    height: 8,
    borderRadius: "50%",
    borderBlockColor: "black",
    borderWidth: 1,
  },

  textHeader: {
    textAlign: "center",
  },

  textBody: {
    marginTop: 32,
    textAlign: "center",
  },
});

export default HomeCarousel;
