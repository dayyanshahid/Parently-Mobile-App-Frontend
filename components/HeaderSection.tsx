import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { colors, typography } from "../utils/theme";
import { platformSelect } from "../utils/platform";

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
      } else if (key === "bell") {
        router.push("/notificationScreen");
      }
    };

    return (
      <TouchableOpacity key={key} style={styles.iconButton} onPress={handlePress}>
        <Feather name={name} size={responsiveDimensions.iconSize.sm} color={colors.textPrimary} />
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
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  bar: {
    width: responsiveDimensions.iconSize.xs,
    height: spacing.xs / 2,
    backgroundColor: colors.white,
    marginBottom: platformSelect({
      ios: -spacing.xs / 2,
      android: -spacing.xs,
    }),
    marginLeft: platformSelect({
      ios: spacing.xs / 4,
      android: spacing.xs / 2,
    }),
  },
  logoText: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.heading2,
  },
  headerIconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    backgroundColor: colors.white,
    width: responsiveDimensions.avatarSize.sm,
    height: responsiveDimensions.avatarSize.sm,
    borderRadius: responsiveDimensions.avatarSize.sm / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.xs,
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: spacing.xs / 2,
    right: spacing.sm,
    width: responsiveDimensions.iconSize.xs / 2,
    height: responsiveDimensions.iconSize.xs / 2,
    borderRadius: responsiveDimensions.iconSize.xs / 4,
    backgroundColor: colors.error,
  },
});
