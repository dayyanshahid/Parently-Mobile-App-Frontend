import React from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "./BackButton";
import { scale, verticalScale, spacing } from "../utils/responsive";
import { platformSelect, getSafeAreaInsets } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  showLogo?: boolean;
  showBackButton?: boolean;
  showBackplate?: boolean;
  onPress?: () => void;
};

export default function GradientBackground({ 
  children, 
  style, 
  showLogo = false, 
  showBackButton = false, 
  showBackplate = false 
}: GradientBackgroundProps) {
  const safeAreaInsets = getSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.gradientSecondaryStart, colors.gradientStart]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1.3, y: 0.4 }}
      style={[styles.container, { paddingTop: safeAreaInsets.top }, style]}
    >
      {showBackButton && (
        <BackButton />
      )}
      {showLogo && (
        <>
          <View style={styles.logoContainer}>
            <View style={styles.bar} />
            <Text style={styles.logo}>PARENTLY</Text>
          </View>
          <View style={styles.mat} />
          <View style={styles.matExtension} />
        </>
      )}
      {showBackplate && (
        <View style={styles.backplate}>
          {children}
        </View>
      )}
      {!showBackplate && children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: verticalScale(20),
    marginHorizontal: 'auto',
  },
  bar: {
    width: platformSelect({
      ios: scale(27),
      android: scale(25),
    }),
    height: verticalScale(6),
    marginLeft: platformSelect({
      ios: scale(3),
      android: scale(4),
    }),
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    marginBottom: platformSelect({
      ios: -verticalScale(10),
      android: -verticalScale(15),
    }),
  },
  logo: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.heading1,
    fontFamily: typography.fontFamily.bold,
    marginBottom: 0,
  },
  mat: {
    width: '180%',
    height: '10%',
    position: 'absolute',
    marginTop: '52%',
    backgroundColor: colors.white,
    transform: [{ skewY: "-10deg" }]
  },
  matExtension: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginTop: '70%',
  },
  backplate: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    margin: spacing.md,
    padding: spacing.md,
  }
});
