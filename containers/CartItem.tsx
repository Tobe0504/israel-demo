import CustomButton from "@/components/CustomButton";
import CustomDropdown from "@/components/CustomDropdown";
import Loader from "@/components/Loader";
import { ThemedText } from "@/components/ThemedText";
import { AuthContext } from "@/context/AuthContext";
import { generateImageURL } from "@/helpers/generateImageURL";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import usePrice from "@/hooks/usePrice";
import { cartItemType, productType, requestType } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import { Button, Image, TextInput, View } from "react-native";

type CartItemType = {
  data: cartItemType;
  request?: () => void;
};

const CartItem = ({ data, request }: CartItemType) => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [deleteRequestState, setDeleteRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [priceState, setPriceState] = useState("0");
  const [quantity, setQuantity] = useState(1);

  //   Context
  const { user } = useContext(AuthContext);

  //   Hooks
  const { handleError } = useError();
  const { returnExchangeRatedPrice } = usePrice();

  // Utils
  const getPrice = async (price: string | number) => {
    const priceValue = await returnExchangeRatedPrice(price);

    setPriceState(priceValue as string);
  };

  // Requests
  const getProductDetailsHandler = () => {
    requestHandler({
      url: `api/product/getSingleProduct?Id=${data?.ProductId}`,
      method: "GET",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        console.log(err?.response?.data);
      },
    });
  };

  const removeItemFromCartHandler = () => {
    requestHandler({
      url: `api/cart/removeUserCartProduct`,
      method: "POST",
      data: {
        UserId: user?.Id,
        ProductId: requestState?.data?.SingleResult?.Id,
      },
      state: deleteRequestState,
      setState: setDeleteRequestState,
      errorFunction(err) {
        console.log(err?.response?.data);
        handleError(err);
      },
      successFunction(res) {
        console.log(res?.data, "Check");

        if (request) {
          request();
        }
      },
    });
  };

  //   Effects
  useEffect(() => {
    getProductDetailsHandler();
  }, []);

  // Effects
  useEffect(() => {
    if (requestState?.data?.SingleResult) {
      getPrice(requestState?.data?.SingleResult?.Price);
    }
  }, [requestState?.data]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <View style={{ backgroundColor: "#C4C4C433", padding: 16, margin: 16 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 14,
          alignItems: "flex-start",
        }}
      >
        <Image
          source={{
            uri: generateImageURL(
              requestState?.data?.SingleResult.ProductImage[0]?.MobileImageUrl
            ),
          }}
          style={{ width: 65, height: 79 }}
        />
        <View style={{ flexShrink: 1 }}>
          <ThemedText type="defaultSemiBold" style={{ fontSize: 12 }}>
            {requestState?.data?.SingleResult?.Name}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, marginTop: 12 }}>
            Colour:{" "}
            <ThemedText style={{ fontFamily: "PoppinsSemiBold" }}>
              {/* TODO: How is color come about */}
              Silver{" "}
            </ThemedText>
          </ThemedText>
        </View>
        <ThemedText style={{ fontSize: 14, marginLeft: "auto" }} type="title">
          {priceState}
        </ThemedText>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
          gap: 32,
          alignItems: "flex-end",
        }}
      >
        <View style={{ flex: 1, flexShrink: 1 }}>
          <ThemedText>Quantity</ThemedText>
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              flex: 1,
              height: 48,
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
                title={"+"}
                color="#fff"
                onPress={() => {
                  if (
                    quantity <=
                    Number(requestState?.data?.SingleResult?.QuantityInStock)
                  ) {
                    setQuantity((prevState) => prevState + 1);
                  }
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            padding: 0,
            backgroundColor: "#EC1D24",
            borderRadius: 5,
            height: 48,
            justifyContent: "center",
          }}
        >
          <CustomButton
            text="Remove"
            type="delete"
            loading={deleteRequestState?.isLoading}
            onPress={() => {
              removeItemFromCartHandler();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CartItem;
