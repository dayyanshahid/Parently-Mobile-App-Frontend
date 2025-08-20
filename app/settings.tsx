import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import GradientBackground from "../components/GradientBackground";
import BottomNavigation from "../components/BottomNavigation";
import BackButton from "../components/BackButton";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";

const SETTINGS_SECTIONS = [
  {
    title: "Account",
    items: [
      { key: "profile", icon: "user", label: "Profile Settings", hasArrow: true },
      { key: "family", icon: "users", label: "Family Members", hasArrow: true },
      { key: "subscription", icon: "credit-card", label: "Subscription", hasArrow: true },
    ],
  },
  {
    title: "Preferences",
    items: [
      { key: "notifications", icon: "bell", label: "Notifications", hasToggle: true, value: true },
      { key: "darkmode", icon: "moon", label: "Dark Mode", hasToggle: true, value: false },
      { key: "language", icon: "globe", label: "Language", hasArrow: true, value: "English" },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      { key: "privacy", icon: "shield", label: "Privacy Settings", hasArrow: true },
      { key: "security", icon: "lock", label: "Security", hasArrow: true },
      { key: "data", icon: "database", label: "Data & Storage", hasArrow: true },
    ],
  },
  {
    title: "Support",
    items: [
      { key: "help", icon: "help-circle", label: "Help Center", hasArrow: true },
      { key: "contact", icon: "mail", label: "Contact Us", hasArrow: true },
      { key: "feedback", icon: "message-square", label: "Send Feedback", hasArrow: true },
    ],
  },
];

export default function SettingsScreen() {
  const router = useRouter();
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    darkmode: false,
  });

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleSettingPress = (key: string) => {
    console.log("Setting pressed:", key);
    // Handle navigation to specific setting screens
    switch (key) {
      case "profile":
        // Navigate to profile settings
        break;
      case "family":
        // Navigate to family management
        break;
      case "help":
        // Navigate to help center
        break;
      default:
        break;
    }
  };

  const renderSettingItem = (item: any) => (
    <TouchableOpacity 
      key={item.key} 
      style={styles.settingItem}
      onPress={() => handleSettingPress(item.key)}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Feather name={item.icon} size={responsiveDimensions.iconSize.md} color={colors.primary} />
        </View>
        <View style={styles.settingInfo}>
          <Text style={styles.settingLabel}>{item.label}</Text>
          {item.value && (
            <Text style={styles.settingValue}>{item.value}</Text>
          )}
        </View>
      </View>
      <View style={styles.settingRight}>
        {item.hasToggle && (
          <Switch
            value={toggleStates[item.key as keyof typeof toggleStates]}
            onValueChange={() => handleToggle(item.key)}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        )}
        {item.hasArrow && (
          <Feather name="chevron-right" size={responsiveDimensions.iconSize.md} color={colors.textTertiary} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSettingSection = (section: any) => (
    <View key={section.title} style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <View style={styles.sectionContent}>
        {section.items.map(renderSettingItem)}
      </View>
    </View>
  );

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <ScrollView 
          style={styles.settingsList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View>
                <Text style={styles.profileName}>Sarah Johnson</Text>
                <Text style={styles.profileEmail}>sarah.johnson@email.com</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={responsiveDimensions.iconSize.sm} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {SETTINGS_SECTIONS.map(renderSettingSection)}

          <TouchableOpacity style={styles.logoutButton}>
            <Feather name="log-out" size={responsiveDimensions.iconSize.md} color={colors.error} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </View>

      <BottomNavigation activeTab="settings" />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTitle: {
    marginLeft: responsiveDimensions.avatarSize.md,
    fontSize: typography.fontSize.heading2,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.white,
  },
  placeholder: {
    width: responsiveDimensions.avatarSize.md,
  },
  content: {
    flex: 1,
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    paddingTop: spacing.md,
  },
  settingsList: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...getShadow('card'),
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: responsiveDimensions.avatarSize.lg,
    height: responsiveDimensions.avatarSize.lg,
    borderRadius: responsiveDimensions.avatarSize.lg / 2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.xs,
  },
  avatarText: {
    fontSize: typography.fontSize.heading2,
    color: colors.white,
  },
  profileName: {
    fontSize: typography.fontSize.heading3,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  profileEmail: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
  },
  editButton: {
    padding: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textTertiary,
    marginBottom: spacing.xs,
    marginHorizontal: spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    ...getShadow('card'),
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: responsiveDimensions.avatarSize.md,
    height: responsiveDimensions.avatarSize.md,
    borderRadius: responsiveDimensions.avatarSize.md / 2,
    backgroundColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.xs,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily.medium,
    color: colors.textPrimary,
    marginBottom: spacing.xs / 2,
  },
  settingValue: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular,
  },
  settingRight: {
    marginLeft: spacing.xs,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.error,
    ...getShadow('card'),
  },
  logoutText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.error,
    marginLeft: spacing.sm,
  },
  footer: {
    alignItems: "center",
    paddingVertical: spacing.md,
    paddingBottom: spacing.xxl,
  },
  versionText: {
    fontSize: typography.fontSize.md,
    color: colors.textTertiary,
    fontFamily: typography.fontFamily.regular,
  },
});
