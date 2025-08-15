import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const NAV_ITEMS = [
  { key: "home", icon: "home", label: "Home", route: "/homescreen" },
  { key: "calendar", icon: "calendar", label: "Calendar", route: "/schedule" },
  { key: "tasks", icon: "check-square", label: "Tasks", route: "/homescreen" },
  { key: "settings", icon: "settings", label: "Settings", route: "/settings" },
];

interface BottomNavigationProps {
  activeTab?: string;
}

export default function BottomNavigation({ activeTab = "home" }: BottomNavigationProps) {
  const router = useRouter();

  const handleNavPress = (route: string) => {
    router.push(route as any);
  };

  const renderNavItem = ({ key, icon, label, route }: any) => {
    const isActive = activeTab === key;
    
    return (
      <TouchableOpacity 
        key={key} 
        style={styles.navItem}
        onPress={() => handleNavPress(route)}
      >
        <Feather 
          name={icon} 
          size={24} 
          color={isActive ? "#c93c7c" : "#888"} 
        />
        <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {NAV_ITEMS.map(renderNavItem)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 10,
    elevation: 10,
  },
  navContainer: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 27,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    // backgroundColor: 'black',
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontWeight: "500",
  },
  navLabelActive: {
    color: "#c93c7c",
    fontWeight: "bold",
  },
});
