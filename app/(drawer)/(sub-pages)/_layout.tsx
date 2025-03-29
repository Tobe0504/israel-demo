import { Stack } from 'expo-router';
import React from 'react';

export default function SubPagesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="cart"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="all-products"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="payment-options"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="paystack"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="products"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="search"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
