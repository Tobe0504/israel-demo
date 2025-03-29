import ActiveUserHeader from '@/containers/ActiveUserHeader';
import Header from '@/containers/Header';
import { Stack, usePathname } from 'expo-router';
import React, { useEffect } from 'react';

export default function SubPagesLayout() {
    const pathname = usePathname();

    useEffect(() => {
        console.log("Current route:", pathname);
    }, [pathname]);
    return (
        <Stack>
            <Stack.Screen
                name="cart"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "cart" ? "Cart" : ""} />
                })}
            />
            <Stack.Screen
                name="all-products"
                options={{ header: () => <Header /> }}
            />
            <Stack.Screen
                name="payment-options"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "payment-options" ? "Payments" : ""} />
                })}
            />
            <Stack.Screen
                name="paystack"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "paystack" ? "Paystack" : ""} />
                })}
            />
            <Stack.Screen
                name="products"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "products" ? "Products" : ""} />
                })}
            />
            <Stack.Screen
                name="search"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "search" ? "Search " : ""} />
                })}
            />
            <Stack.Screen
                name="lighting-explorer"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "lighting-explorer" ? "Explore" : ""} />
                })}
            />
            <Stack.Screen
                name="suggestions"
                options={({ route }) => ({
                    header: () => <ActiveUserHeader title={route?.name === "suggestions" ? "Explore" : ""} />
                })}
            />
        </Stack>
    );
}
