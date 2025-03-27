import { formatCurrency } from "@/helpers/formatAmount";
import { generateImageURL } from "@/helpers/generateImageURL";
import usePrice from "@/hooks/usePrice";
import { productType } from "@/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import Loader from "./Loader";
import { ThemedText } from "./ThemedText";

type ProductCardTypes = {
  data: productType;
  loading?: boolean;
  onDelete?: (id: number) => void;
};

const ProductCard = ({ data, loading, onDelete }: ProductCardTypes) => {
  // Router
  const router = useRouter();

  // State
  const [priceState, setPriceState] = useState("0");

  // Hook
  const { returnExchangeRatedPrice } = usePrice();

  // Utils
  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setPriceState(priceValue as string);
  };

  // Effects
  useEffect(() => {
    if (data?.Price) {
      getPrice(data?.Price);
    }
  }, [data?.Price]);

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        marginBottom: 16,
        backgroundColor: "#C4C4C433",
        flexDirection: "row",
        gap: 14,
        borderRadius: 5,
      }}
      onPress={() => router.push(`/product/${data?.Id}`)}
    >
      <Image
        source={{
          uri: generateImageURL(data?.ProductImage[0]?.MobileImageUrl),
        }}
        style={{
          width: 65,
          height: 79,
          borderRadius: 5,
        }}
      />

      <View style={{ flexShrink: 1, flex: 1 }}>
        <ThemedText
          style={{ marginBottom: 5, fontFamily: "PoppinsMedium", fontSize: 12 }}
        >
          {data?.Name}
        </ThemedText>
        <ThemedText>
          {/* TODO:Color how? */}
          Colour:
          <ThemedText style={{ fontFamily: "PoppinsMedium" }}>
            Silver
          </ThemedText>
        </ThemedText>
      </View>

      <View style={{ justifyContent: "space-between", alignItems: "center" }}>
        <ThemedText type="defaultSemiBold">{priceState}</ThemedText>
        {loading ? (
          <ActivityIndicator size={18} />
        ) : (
          <Ionicons
            name="trash-outline"
            color="#FF0000"
            size={18}
            onPress={() => onDelete && onDelete(data?.Id)}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
