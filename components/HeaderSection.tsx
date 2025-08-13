import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const HEADER_ICONS = [
  { name: "search", key: "search" },
  { name: "bell", key: "bell", hasDot: true },
  { name: "plus", key: "plus" },
];

interface HeaderSectionProps {
  title?: string;
}

export default function HeaderSection({ title = "PARENTLY" }: HeaderSectionProps) {
  const renderHeaderIcon = ({ name, hasDot, key }: any) => (
    <TouchableOpacity key={key} style={styles.iconButton}>
      <Feather name={name} size={20} color="#fff" />
      {hasDot && <View style={styles.redDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.header}>
      <Text style={styles.logoText}>{title}</Text>
      <View style={styles.headerIconsContainer}>
        {HEADER_ICONS.map(renderHeaderIcon)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical:20,
    paddingHorizontal: 10,
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIconsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
});
