import { StyleSheet, Text, View } from "react-native";
import GradientBackground from "./GradientBackground";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface EventMatProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function EventMat({ children, title, subtitle }: EventMatProps) {
  return (
    <GradientBackground>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.body}>
       {children}
      </View>
    </GradientBackground>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  body: {
    flex: 1,
    paddingTop: "1%",
    borderRadius: 36,
    backgroundColor: "white",
  },
});