import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform, UIManager, LayoutAnimation } from "react-native";
import { initializeTheme } from "../utils/theme";
import { getStatusBarProps, animationConfig } from "../utils/platform";

// Enable LayoutAnimation on Android with optimizations
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function RootLayout() {
  useEffect(() => {
    // Initialize theme system and disable system theme changes
    initializeTheme();
    
    // Configure optimized layout animations for Android
    if (Platform.OS === 'android') {
      LayoutAnimation.configureNext({
        duration: animationConfig.layout.duration,
        create: {
          type: LayoutAnimation.Types.easeOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.easeOut,
        },
      });
    }
  }, []);

  const statusBarProps = getStatusBarProps();

  return (
    <>
      <StatusBar {...statusBarProps} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'android' ? 'fade_from_bottom' : 'slide_from_right',
          gestureEnabled: true,
          // Android-specific optimizations
          ...(Platform.OS === 'android' && {
            detachInactiveScreens: true, // Better memory management on Android
            animationDuration: animationConfig.timing.duration,
          }),
        }}
      />
    </>
  );
}
