import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      {/* Grup tabs */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Halaman lain */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}