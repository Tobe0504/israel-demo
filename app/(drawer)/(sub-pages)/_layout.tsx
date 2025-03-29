import ActiveUserHeader from '@/containers/ActiveUserHeader';
import { Stack } from 'expo-router';
import React from 'react';

export default function SubPagesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="cart"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "cart" ? "Cart" : "Route"} />
                })}
            />
            <Stack.Screen
                name="all-products"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="payment-options"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "payment-options" ? "Payments" : "Route"} />
                })}
            />
            <Stack.Screen
                name="paystack"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "paystack" ? "Paystack" : "Route"} />
                })}
            />
            <Stack.Screen
                name="products"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "products" ? "Products" : "Route"} />
                })}
            />
            <Stack.Screen
                name="search"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "search" ? "Search " : "Route"} />
                })}
            />
            <Stack.Screen
                name="lighting-explorer"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "lighting-explorer" ? "Explore" : "Route"} />
                })}
            />
        </Stack>
    );
}
