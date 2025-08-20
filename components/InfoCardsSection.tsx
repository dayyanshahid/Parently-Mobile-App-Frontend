import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { scale, spacing, responsiveDimensions, deviceInfo } from "../utils/responsive";
import { getBlurViewProps, getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

const INFO_CARDS = [
  { key: "upcoming", label: "Upcoming", count: "03" },
  { key: "tasks", label: "My Tasks", count: "15" },
];

interface InfoCardsSectionProps {
  onFilterPress?: () => void;
}

export default function InfoCardsSection({ onFilterPress }: InfoCardsSectionProps) {
  const blurViewProps = getBlurViewProps();
  
  // Calculate responsive card width
  const cardWidth = (deviceInfo.width - scale(100)) / 2;

  return (
    <View style={styles.infoCardsContainer}>
      {INFO_CARDS.map(({ key, label, count }) => (
        <View
          key={key}
          style={[styles.cardWrapper, { width: cardWidth }]}
        >
          {/* Blur background */}
          <BlurView
            {...blurViewProps}
            intensity={8}
            style={StyleSheet.absoluteFill}
          />

          {/* Foreground content (sharp text) */}
          <View style={styles.cardContent}>
            <Text style={styles.infoCount}>{count}</Text>
            <Text style={styles.infoLabel}>{label}</Text>
          </View>
        </View>
      ))}

      {/* Filter button */}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Feather
          name="sliders"
          size={responsiveDimensions.iconSize.sm}
          color={colors.textPrimary}
          style={{ transform: [{ rotate: "90deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
    marginRight: "10%",
    alignItems: "center",
  },
  cardWrapper: {
    borderRadius: borderRadius.xxl,
    overflow: "hidden",
    margin: spacing.xs / 2,
    alignSelf: "center",
    borderColor: colors.glassBorder,
    borderWidth: 1,
    ...getShadow('card'),
  },
  cardContent: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  infoCount: {
    color: colors.white,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.xs,
  },
  infoLabel: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
  },
  filterButton: {
    backgroundColor: colors.white,
    width: responsiveDimensions.avatarSize.md,
    height: responsiveDimensions.avatarSize.md,
    borderRadius: responsiveDimensions.avatarSize.md / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.sm,
    ...getShadow('button'),
  },
});
