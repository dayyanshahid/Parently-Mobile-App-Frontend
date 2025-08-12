import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type StyledButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
};

export default function StyledButton({ title, onPress, style, children }: StyledButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#e24fa3",
    borderRadius: 32,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    flexDirection: "row",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
