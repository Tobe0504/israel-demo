import CustomButton from "@/components/CustomButton";
import CustomDropdown from "@/components/CustomDropdown";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { activeToggler } from "@/helpers/activeToggler";
import { capitalize } from "@/helpers/capitalize";
import { formatCurrency } from "@/helpers/formatAmount";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import usePrice from "@/hooks/usePrice";
import useToast from "@/hooks/useToast";
import { ProductColorToneType, productType, requestType } from "@/utils/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Button, ScrollView, TextInput, View, Share } from "react-native";
import Toast from "react-native-toast-message";

type ProductDetailsInformationTypes = {
  data: productType;
};

const ProductDetailsInformation = ({
  data,
}: ProductDetailsInformationTypes) => {
  // States
  const [colors, setColors] = useState<ProductColorToneType[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [price, setPrice] = useState("");
  const [priceWithQuantity, setPriceWIthQuantity] = useState("");

  // COntext
  const { user, setOrderItem } = useContext(AuthContext);

  // Router
  const router = useRouter();
  const { productId } = useLocalSearchParams();

  // Hooks
  const { handleError } = useError();
  const { returnExchangeRatedPrice, returnExchangeRateValueOnly } = usePrice();
  const { showToast } = useToast();

  const addToListHandler = () => {
    requestHandler({
      url: "api/list/addToList",
      data: {
        UserId: user?.Id,
        ProductId: productId,
      },
      method: "POST",
      state: requestState,
      setState: setRequestState,
      id: "add-to-list",
      successFunction(res) {
        Toast.show({
          text1: "Success!",
          text2: "This item has been added to lists successfully",
        });
      },
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const addToCartHandler = () => {
    requestHandler({
      url: "api/cart/addToCart",
      data: {
        UserId: user?.Id,
        ProductId: productId,
      },
      method: "POST",
      state: requestState,
      setState: setRequestState,
      id: "add-to-cart",
      successFunction(res) {
        Toast.show({
          text1: "Success!",
          text2: "This item has been added to cart successfully",
        });
      },
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  const sharehandler = async () => {
    try {
      const result = await Share.share({
        message: `Hi there, check out this product at: https://thelighthaus.com/ProductDetail/${productId}`,
      });
    } catch (error: any) {
      handleError(error);
    }
  };

  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setPrice(priceValue as string);
  };

  const getPriceWithQty = async (price: string | number) => {
    const priceValue = await returnExchangeRateValueOnly(price);

    setPriceWIthQuantity(priceValue as string);
    setOrderItem((prevState) => {
      return {
        ...prevState,
        TotalPrice: Number(data?.Price * quantity),
        ProductOrders: [
          {
            Id: data?.Id,
            OrderRef: 0,
            ProductId: data?.Id,
            ProductQuantity: 1,
            UnitPrice: String(price),
            Price: price as any,
            Product: null,
          },
        ],
      };
    });
  };

  // Effects
  useEffect(() => {
    if (data) {
      setColors(
        data?.ProductColorTone?.map((data) => {
          return { ...data, isActive: false };
        })
      );
    }

    if (data?.Price) {
      getPrice(data?.Price);
    }
  }, [data]);

  useEffect(() => {
    if (data?.Price) {
      const newPrice = data?.Price * quantity;

      getPriceWithQty(newPrice);
    }
  }, [quantity, data]);

  return (
    <View style={{ paddingVertical: 30 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 24,
          marginBottom: 40,
        }}
      >
        <ThemedText style={{ flexShrink: 1, flex: 1 }} type="defaultSemiBold">
          {data?.Name}
        </ThemedText>
        <ThemedText type="title">{price}</ThemedText>
      </View>

      <View style={{ paddingVertical: 21 }}>
        <ThemedText
          style={{
            fontFamily: "PoppinsMedium",
            fontSize: 12,
            marginBottom: 12,
          }}
        >
          Product Description
        </ThemedText>
        <ThemedText style={{ fontSize: 13 }}>
          {capitalize(data?.Description)}
        </ThemedText>
      </View>

      <View
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#000",
          paddingVertical: 14,
        }}
      >
        <ThemedText style={{ marginBottom: 17, fontFamily: "PoppinsMedium" }}>
          Product Properties
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Lighting Color:
          </ThemedText>{" "}
          {data?.ColorType?.Name}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Body Color:{" "}
          </ThemedText>
          {data?.ProductFittingColor?.map((material, i) => {
            if (i === data?.ProductFittingColor?.length - 1) {
              return <ThemedText>{material?.Color?.Name}</ThemedText>;
            }
            return <ThemedText>{material?.Color?.Name}, </ThemedText>;
          })}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Material:{" "}
            {data?.ProductFittingMaterial?.map((material, i) => {
              if (i === data?.ProductFittingMaterial?.length - 1) {
                return (
                  <ThemedText>{material?.FittingMaterial?.Name}</ThemedText>
                );
              }
              return (
                <ThemedText>{material?.FittingMaterial?.Name}, </ThemedText>
              );
            })}
          </ThemedText>
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Product Type:
          </ThemedText>{" "}
          {data?.ProductType?.Name}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Space Suggestions:
          </ThemedText>{" "}
          {data?.SpaceTypes?.map((space: any, i: number) => {
            if (i === data?.SpaceTypes?.length - 1) {
              return <ThemedText>{space?.SpaceType?.Space}</ThemedText>;
            }
            return <ThemedText>{space?.SpaceType?.Space}, </ThemedText>;
          })}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Product Design:
          </ThemedText>{" "}
          {data?.ProductDesign[0]?.DesignType?.Name || "No product design"}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Installation Location:
          </ThemedText>{" "}
          {data?.Location?.Name}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Product Shape:
          </ThemedText>{" "}
          {data?.Shape?.Name}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Product Dimensions (Lamp Body):
          </ThemedText>
          {data?.ProductDimension?.map((dimension, i) => {
            if (i === data?.ProductFittingMaterial?.length - 1) {
              return (
                <ThemedText>
                  (Height - {dimension?.Height}cm , Diameter(ø){" "}
                  {dimension?.Length}cm)
                </ThemedText>
              );
            }
            return (
              <ThemedText>
                (Height - {dimension?.Height}cm , Diameter(ø){" "}
                {dimension?.Length}cm ),{" "}
              </ThemedText>
            );
          })}
        </ThemedText>

        <ThemedText style={{ marginBottom: 8 }}>
          <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
            Gross Weight:
          </ThemedText>{" "}
          {data?.Weight}Kg
        </ThemedText>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginVertical: 24,
          gap: 16,
          alignItems: "flex-end",
        }}
      >
        <View style={{ flexBasis: 117 }}>
          <ThemedText>Quantity</ThemedText>
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              flex: 1,
              height: 58,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                justifyContent: "center",
              }}
            >
              <Button
                title="-"
                color="#fff"
                onPress={() => {
                  if (quantity > 1) {
                    setQuantity((prevState) => prevState - 1);
                  }
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                borderWidth: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput value={String(quantity)} />
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: "#000",
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: "center",
              }}
            >
              <Button
                title="+"
                color="#fff"
                onPress={() => {
                  if (quantity < Number(data?.QuantityInStock)) {
                    setQuantity((prevState) => prevState + 1);
                  } else {
                    showToast(
                      "Exceeded available stock",
                      `There are only ${data?.QuantityInStock} items available for purchase`,
                      "error"
                    );
                  }
                }}
              />
            </View>
          </View>
        </View>

        <CustomButton
          text="Add to List"
          style={{ height: 58, flexShrink: 1, flexGrow: 1, paddingInline: 8 }}
          type="secondary"
          onPress={() => {
            addToListHandler();
          }}
          loading={
            requestState?.isLoading && requestState?.id === "add-to-list"
          }
        />
        <CustomButton
          text="Share"
          style={{
            height: 58,
            paddingVertical: 2,
            flexShrink: 1,
            flexGrow: 1,
            paddingInline: 8,
          }}
          onPress={sharehandler}
        />
      </View>

      <CustomButton
        text="Add to Cart"
        type="secondary"
        style={{ marginBottom: 16 }}
        loading={requestState?.isLoading && requestState?.id === "add-to-cart"}
        onPress={() => {
          addToCartHandler();
        }}
      />
      <CustomButton
        text={`Buy Now (₦${formatCurrency(priceWithQuantity)})`}
        style={{ marginBottom: 16 }}
        onPress={() => router.push("/shipping-options")}
      />

      <View style={{ borderBottomWidth: 1, borderBottomColor: "#000" }} />
    </View>
  );
};

export default ProductDetailsInformation;
