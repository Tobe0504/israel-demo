import ActiveUserHeader from "@/containers/ActiveUserHeader";
import Header from "@/containers/Header";
import { Stack } from "expo-router";
import React from "react";

export default function SubPagesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="cart"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader title={route?.name === "cart" ? "Cart" : ""} />
          ),
        })}
      />
      <Stack.Screen
        name="all-products"
        options={{ header: () => <Header isBack /> }}
      />
      <Stack.Screen
        name="payment-options"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "payment-options" ? "Payments" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="shipping-options"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={
                route?.name === "shipping-options" ? "Shipping Options" : ""
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="paystack"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "paystack" ? "Paystack" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="interswitch"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "interswitch" ? "Interswitch" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="product/[productId]"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={
                route?.name === "product/[productId]" ? "Products Details" : ""
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="order-success"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={
                route?.name === "order-success" ? "Order Confirmation" : ""
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="search"
        options={({ route }) => ({
          header: () => <Header isBack />,
        })}
      />
      <Stack.Screen
        name="lighting-explorer"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={
                route?.name === "lighting-explorer" ? "Lighting Explorer" : ""
              }
            />
          ),
        })}
      />

      <Stack.Screen
        name="suggestions"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "suggestions" ? "Explore" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="my-list"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "my-list" ? "My List" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="my-orders"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={route?.name === "my-orders" ? "My Orders" : ""}
            />
          ),
        })}
      />

      <Stack.Screen
        name="category-details/[categoryId]"
        options={({ route }) => ({
          header: () => (
            <ActiveUserHeader
              title={
                route?.name === "category-details/[categoryId]"
                  ? "Categories"
                  : ""
              }
            />
          ),
        })}
      />
    </Stack>
  );
}
