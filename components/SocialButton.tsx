import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from "react-native";

type SocialButtonProps = {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
};

export default function SocialButton({ title, icon, onPress, style }: SocialButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.85}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 24,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
    justifyContent: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    width: 24,
    height: 24,
  },
  text: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
