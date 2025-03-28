import { Stack } from 'expo-router';
import React from 'react';

export default function SubPagesLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="cart"
                options={{ headerShown: false }}
            />
        </Stack>
    );
}
