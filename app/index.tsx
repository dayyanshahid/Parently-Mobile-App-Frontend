import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, PixelRatio } from "react-native";
import { useRouter } from "expo-router";
import GradientBackground from "../components/GradientBackground";

const { width, height } = Dimensions.get("window");

// Helper functions for scaling
const scale = size => (width / 375) * size; // 375 = base iPhone width
const verticalScale = size => (height / 812) * size; // 812 = base iPhone height
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.content}>
        {/* Bar above P */}
        <View style={{ alignItems: "center", marginBottom: verticalScale(10) }}>
          <View style={styles.bar} />
          <Text style={styles.logo}>PARENTLY</Text>
        </View>
        <Text style={styles.tagline}>YOUR LIFE ADMIN ASSISTANT</Text>
      </View>
      <Text style={styles.powered}>POWERED BY AI</Text>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  content: {
    alignItems: "center",
    marginBottom: verticalScale(20),
    zIndex: 1,
  },
  bar: {
    width: scale(27),
    height: verticalScale(7),
    backgroundColor: "#fff",
    marginBottom: -verticalScale(16),
    marginLeft: scale(4),
    alignSelf: "flex-start",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: moderateScale(58),
  },
  tagline: {
    color: "#fff",
    fontSize: moderateScale(16),
    letterSpacing: scale(3),
    textAlign: "center",
    marginTop: -verticalScale(20),
  },
  powered: {
    position: "absolute",
    bottom: verticalScale(50),
    width: "100%",
    textAlign: "center",
    color: "#fff",
    fontSize: moderateScale(14),
    letterSpacing: scale(2),
    opacity: 0.8,
    zIndex: 1,
  },
});
