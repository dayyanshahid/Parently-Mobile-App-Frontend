import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

const QUICK_ACTIONS = [
  { key: "add-event", icon: "calendar-plus", label: "Add Event", color: "#4CAF50" },
  { key: "add-task", icon: "plus-square", label: "Add Task", color: "#2196F3" },
  { key: "add-reminder", icon: "bell-plus", label: "Reminder", color: "#FF9800" },
  { key: "take-photo", icon: "camera", label: "Photo", color: "#9C27B0" },
  { key: "add-note", icon: "edit-3", label: "Note", color: "#607D8B" },
  { key: "emergency", icon: "phone-call", label: "Emergency", color: "#F44336" },
];

interface QuickActionsSectionProps {
  onActionPress?: (actionKey: string) => void;
  actions?: typeof QUICK_ACTIONS;
}

export default function QuickActionsSection({ 
  onActionPress, 
  actions = QUICK_ACTIONS 
}: QuickActionsSectionProps) {
  const renderQuickAction = ({ key, icon, label, color }: any) => (
    <TouchableOpacity 
      key={key} 
      style={[styles.actionButton, { backgroundColor: `${color}15` }]}
      onPress={() => onActionPress?.(key)}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Feather name={icon} size={20} color="#fff" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity>
          <Text style={styles.customizeText}>Customize</Text>
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.actionsContainer}
      >
        {actions.map(renderQuickAction)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  customizeText: {
    fontSize: 14,
    color: "#c93c7c",
    fontWeight: "500",
  },
  actionsContainer: {
    paddingRight: 20,
  },
  actionButton: {
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    minWidth: 80,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },
});
