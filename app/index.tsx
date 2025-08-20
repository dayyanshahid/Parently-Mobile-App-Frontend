import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import GradientBackground from "../components/GradientBackground";
import { scale, verticalScale, moderateScale, spacing } from "../utils/responsive";
import { platformSelect } from "../utils/platform";
import { colors, typography } from "../utils/theme";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeoutDuration = 3000;

    const timer = setTimeout(() => {
      router.replace("/login");
    }, timeoutDuration);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.content}>
        {/* Bar above P */}
        <View style={styles.logoContainer}>
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
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  bar: {
    width: scale(27),
    height: verticalScale(7),
    backgroundColor: colors.white,
    marginBottom: platformSelect({
      ios: -verticalScale(10),
      android: -verticalScale(14),
    }),
    marginLeft: platformSelect({
      ios: scale(3),
      android: scale(4),
    }),
    alignSelf: "flex-start",
  },
  logo: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.display,
    fontFamily: typography.fontFamily.bold,
  },
  tagline: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    letterSpacing: platformSelect({
      ios: typography.letterSpacing.wide,
      android: typography.letterSpacing.wider,
    }),
    textAlign: "center",
    marginTop: platformSelect({
      ios: -verticalScale(15),
      android: -verticalScale(20),
    }),
  },
  powered: {
    position: "absolute",
    bottom: verticalScale(50),
    width: "100%",
    textAlign: "center",
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: typography.letterSpacing.wide,
    opacity: 0.8,
    zIndex: 1,
  },
});
