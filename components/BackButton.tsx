import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface BackButtonProps {
  size?: number;
  color?: string;
  style?: any;
}

export default function BackButton({ size = 28, color = "#fff", style }: BackButtonProps) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={[styles.backBtn, style]} 
      onPress={() => router.back()}
    >
      <Feather name="arrow-left" size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    // backgroundColor: 'red',
    position: "absolute",
    top: 56,
    left: 24,
    zIndex: 2,
  },
});
