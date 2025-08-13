import React from "react";
import { StyleSheet, View, Text, ViewStyle, SafeAreaView, ScrollView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "./BackButton";

type GradientBackgroundProps = {
  children?: React.ReactNode;
  style?: ViewStyle;
  showLogo?: boolean;
  showBackButton?: boolean;
  showBackplate?: boolean;
  onPress?: () => void;
};

export default function GradientBackground({ children, style, showLogo = false, showBackButton = false, showBackplate = false }: GradientBackgroundProps) {
  return (
      <LinearGradient
        colors={["#2a6cf6", "#e24fa3"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.6, y: 0.3 }}
        style={[styles.container, style]}
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
        {!showBackplate && children }
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 17,
    // zIndex: -10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
    marginHorizontal: 'auto',
  },
  bar: {
    width: 20,
    height: 5,
    marginLeft: 3,
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    marginBottom: Platform.select({
      ios: -5,
      android: -10,
    }),
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 0,
  },
  mat: {
    width: '180%',
    height: '10%',
    position: 'absolute',
    marginTop: '50%',
    backgroundColor: "white",
    transform: [{ skewY: "-10deg" }]
  },
  matExtension: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    position: 'absolute',
    marginTop: '70%',
  },
  backplate: {
    backgroundColor: 'white',
    borderRadius: 20,
  }
});
