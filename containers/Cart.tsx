import Loader from "@/components/Loader";
import { AuthContext } from "@/context/AuthContext";
import { getAsyncData } from "@/helpers/asyncStorageHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import axiosInstance from "@/services";
import { LOCAL_STORAGE_BASE_CURRENCY } from "@/utils/constants";
import { cartItemType, requestType } from "@/utils/types";
import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CartProductContainer from "./CartProductContainer";
import CartRelatedCustomers from "./CartRelatedCustomers";
import CartSubtotal from "./CartSubtotal";
import NullCart from "./NullCart";

const Cart = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [relatedProductsState, setRelatedpProductsState] =
    useState<requestType>({
      isLoading: false,
      data: null,
      error: null,
    });
  const [cartItems, setCartItems] = useState<cartItemType[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  // Context
  const { user, setOrderItem } = useContext(AuthContext);

  // Hooks
  const { handleError } = useError();

  // Requests
  const getCartItems = () => {
    requestHandler({
      url: `api/cart/getUserCart`,
      data: { UserId: user?.Id },
      method: "POST",
      state: requestState,
      setState: setRequestState,
      errorFunction(err) {
        handleError(err);
      },
      successFunction(res) {
        setCartItems(res?.data?.Result);
      },
    });
  };

  const getRelatedProducts = () => {
    requestHandler({
      url: `api/cart/getTopFiveRelatedCartProductsByOthers`,
      data: { UserId: user?.Id },
      method: "POST",
      state: relatedProductsState,
      setState: setRelatedpProductsState,
      errorFunction(err) {
        handleError(err);
      },
    });
  };

  // Effects
  useEffect(() => {
    getCartItems();
    getRelatedProducts();
  }, []);

  useEffect(() => {
    const fetchPricesAndConvert = async () => {
      setLoading(true);
      try {
        const productPromises = cartItems.map(async (item) => {
          if (!item?.ProductId) {
            throw new Error(`Invalid ProductId: ${item.ProductId}`);
          }

          // Fetch product details
          const response = await axiosInstance.get(
            `api/product/getSingleProduct?Id=${item.ProductId}`
          );

          const productData = response.data?.SingleResult;
          const productPrice = productData?.Price || 0;

          const convertedPrice = productPrice;

          return {
            Id: productData?.Id || 0,
            OrderRef: 0,
            ProductId: productData?.Id || 0,
            ProductQuantity: 1,
            UnitPrice: String(productPrice),
            Price: convertedPrice,
            Product: null,
          };
        });

        const productOrders = await Promise.all(productPromises);

        const total = productOrders.reduce((sum, item) => sum + item.Price, 0);

        // Update state
        setTotalPrice(total);
        setOrderItem((prevState) => ({
          ...prevState,
          TotalPrice: total,
          ProductOrders: productOrders,
          FromCart: true,
        }));

        setLoading(false);
      } catch (error: any) {
        console.error(
          "Error fetching product prices:",
          error?.response?.data?.Message
        );
      }

      setLoading(false);
    };

    if (cartItems.length > 0) {
      fetchPricesAndConvert();
    }
  }, [cartItems]);

  if (requestState?.isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      {requestState?.data?.Result?.length > 0 ? (
        <>
          <CartProductContainer
            data={requestState?.data?.Result}
            request={getCartItems}
            setState={setCartItems}
          />
          <CartSubtotal loading={loading} total={totalPrice} />
        </>
      ) : (
        <NullCart />
      )}

      {relatedProductsState?.data?.Result?.length > 0 && (
        <CartRelatedCustomers
          data={relatedProductsState?.data?.Result}
          loading={relatedProductsState?.isLoading}
        />
      )}
    </ScrollView>
  );
};

export default Cart;
