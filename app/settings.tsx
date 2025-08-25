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
          <Feather name={item.icon} size={20} color="#c93c7c" />
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
            trackColor={{ false: "#e0e0e0", true: "#c93c7c" }}
            thumbColor="#fff"
          />
        )}
        {item.hasArrow && (
          <Feather name="chevron-right" size={20} color="#888" />
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
              <Feather name="edit-2" size={16} color="#c93c7c" />
            </TouchableOpacity>
          </View>

          {SETTINGS_SECTIONS.map(renderSettingSection)}

          <TouchableOpacity style={styles.logoutButton}>
            <Feather name="log-out" size={20} color="#F44336" />
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
    // backgroundColor: 'red',
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  headerTitle: {
    marginLeft: 40,
    // backgroundColor: 'red',
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  placeholder: {
    width: 40,
    // backgroundColor: 'red'
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 20,
  },
  settingsList: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#c93c7c",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
    color: "#fff",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#888",
    marginBottom: 12,
    marginHorizontal: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f9d6db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
  },
  settingRight: {
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#F44336",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F44336",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 100,
  },
  versionText: {
    fontSize: 14,
    color: "#888",
  },
});
