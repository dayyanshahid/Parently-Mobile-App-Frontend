import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { getSafeAreaInsets, getBlurViewProps, getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

const NAV_ITEMS = [
  { key: "home", icons: { default: "home-outline", active: "home" } as const, label: "Home", route: "/homescreen" },
  { key: "tasks", icons: { default: "star-outline", active: "star" } as const, label: "Tasks", route: "" },
  { key: "events", icons: { default: "gift-outline", active: "gift" } as const, label: "Events", route: "/eventInformation" },
  { key: "reminders", icons: { default: "notifications-outline", active: "notifications" } as const, label: "Reminders", route: "" },
  { key: "family", icons: { default: "people-outline", active: "people" } as const, label: "Family", route: "" },
];

interface BottomNavigationProps {
  activeTab?: string;
}

export default function BottomNavigation({ activeTab = "home" }: BottomNavigationProps) {
  const router = useRouter();
  const safeAreaInsets = getSafeAreaInsets();
  const blurViewProps = getBlurViewProps();

  const handleNavPress = (route: string) => {
    if (route) router.push(route as any);
  };

  const renderNavItem = ({ key, icons, label, route }: any) => {
    const isActive = activeTab === key;
    const iconName = isActive ? icons.active : icons.default;

    return (
      <TouchableOpacity
        key={key}
        style={styles.navItem}
        onPress={() => handleNavPress(route)}
        activeOpacity={0.7}
      >
        <View style={isActive ? styles.selectedNavWrapper : styles.navItemContent}>
          <Ionicons
            name={iconName}
            size={responsiveDimensions.iconSize.md}
            color={isActive ? colors.primary : colors.textSecondary}
          />
          <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BlurView
      {...blurViewProps}
      intensity={30}
      style={[
        styles.container,
        {
          paddingBottom: Math.max(safeAreaInsets.bottom, spacing.md),
        }
      ]}
    >
      <View style={styles.navContainer}>
        {NAV_ITEMS.map(renderNavItem)}
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    overflow: "hidden",
    ...getShadow('card'),
  },
  navContainer: {
    flexDirection: "row",
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent,
    minWidth: responsiveDimensions.iconSize.xxl + spacing.md,
  },
  navItemContent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.transparent,
  },
  selectedNavWrapper: {
    backgroundColor: colors.transparent,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  navLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
    textAlign: "center",
  },
  navLabelActive: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.semiBold,
  },
});
