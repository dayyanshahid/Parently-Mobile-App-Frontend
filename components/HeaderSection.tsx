import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HEADER_ICONS = [
  { name: "search", key: "search", hasDot: false },
  { name: "bell", key: "bell", hasDot: true },
  { name: "plus", key: "plus", hasDot: false },
];

interface HeaderSectionProps {
  title?: string;
}

export default function HeaderSection({ title = "PARENTLY" }: HeaderSectionProps) {
  const router = useRouter();

  const renderHeaderIcon = ({ name, hasDot, key }: any) => {
    const handlePress = () => {
      if (key === "plus") {
        router.push("/createEvent");
      }
    };

    return (
      <TouchableOpacity key={key} style={styles.iconButton} onPress={handlePress}>
        <Feather name={name} size={17} color="black" />
        {hasDot && <View style={styles.redDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <View style={styles.bar} />
        <Text style={styles.logoText}>{title}</Text>
      </View>
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
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  bar: {
    width: 13, // smaller than splash
    height: 3,
    backgroundColor: "#fff",
    marginBottom: Platform.select({
      ios: -3,
      android: -5,
    }),
    marginLeft: Platform.select({
      ios: 1.25,
      android: 2,
    }),
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIconsContainer: {
    flexDirection: "row",
    // backgroundColor: 'red'
  },
  iconButton: {
    backgroundColor: "white",
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
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
});
