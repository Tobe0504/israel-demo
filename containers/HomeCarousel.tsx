import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

const carouselElements = [
  {
    title: "Lighting Xplorer",
    caption:
      "Not sure of what you’re looking for? No worries! Set your preference in the Lighting Xplorer and we’ll show you what you can get.",
    image: require("../assets/images/carousel1.png"),
  },
  {
    title: "Select Product",
    caption:
      "Select preferred product, set product preference and proceed to checkout.",
    image: require("../assets/images/carousel2.png"),
  },
  {
    title: "Payment & Delivery",
    caption: "Pay with your bank card and order will be delivered to you.",
    image: require("../assets/images/carousel1.png"),
  },
];

const HomeCarousel = () => {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle automatic scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselElements.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Viewable index change on user scroll
  const onViewRef = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index || 0);
      }
    }
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={carouselElements}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ ...styles.slide, width: screenWidth }}>
            <Image source={item.image} style={styles.image} />
            <ThemedText type="title" style={styles.textHeader}>
              {item.title}
            </ThemedText>
            <ThemedText style={styles.textBody}>{item.caption}</ThemedText>
          </View>
        )}
      />

      <View style={styles.carouselContainer}>
        <View style={styles.carouselDots}>
          {carouselElements.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                flatListRef.current?.scrollToIndex({ index: i, animated: true })
              }
              style={i === activeIndex ? styles.active : styles.inActive}
            />
          ))}
        </View>
        <CustomButton
          text="Get Started"
          icon="chevron-forward-outline"
          onPress={() => router.push("/dashboard")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  slide: {
    width: 320,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 50,
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  textBody: {
    textAlign: "center",
    marginTop: 32,
    fontSize: 16,
    width: "90%",
  },
  carouselContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 32,
  },
  carouselDots: {
    flexDirection: "row",
    gap: 12,
  },
  active: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
  },
  inActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "transparent",
  },
});

export default HomeCarousel;
