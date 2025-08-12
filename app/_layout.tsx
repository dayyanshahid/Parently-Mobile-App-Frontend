import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Screens are auto-registered by Expo Router based on file structure */}
    </Stack>
  );
}
