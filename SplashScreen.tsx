// index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function IndexScreen() {
  return (
    <LinearGradient
      colors={["#2D75FF", "#FF4FA0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.centerContent}>
        <Text style={styles.title}>
          <Text style={styles.titleAccent}>P</Text>ARENTLY
        </Text>
        <Text style={styles.subtitle}>YOUR LIFE ADMIN ASSISTANT</Text>
      </View>

      <Text style={styles.footer}>POWERED BY AI</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  centerContent: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  titleAccent: {
    textDecorationLine: "overline", // The line above the "P"
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    letterSpacing: 1,
    color: "#fff",
  },
  footer: {
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
});
