import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { Image, View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { productType } from "../utils/types";
import { generateImageURL } from "@/helpers/generateImageURL";

const images = [
  require("../assets/images/categoryImage.png"),
  require("../assets/images/categoryImage.png"),
  require("../assets/images/categoryImage.png"),
];

type ProductDetailsImageCarouselTypes = {
  data: productType;
};

const ProductDetailsImageCarousel = ({
  data,
}: ProductDetailsImageCarouselTypes) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveIndex(index);
  };

  return (
    <View>
      <ThemedText type="subtitle" style={{ marginBottom: 16 }}>
        Product Details
      </ThemedText>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {data?.ProductImage?.map((data) => {
          return (
            <Image
              source={{ uri: generateImageURL(data?.MobileImageUrl) }}
              style={{
                width: screenWidth - 100,
                height: 332,
                marginRight: 6,
                borderRadius: 5,
              }}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          marginTop: 5,
          justifyContent: "center",
        }}
      >
        {data?.ProductImage?.map((_, i) => {
          return (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            ></View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 1,
    marginTop: 10,
  },
  activeDot: {
    backgroundColor: "#000",
  },
});

export default ProductDetailsImageCarousel;
