import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const REMINDERS = [
  {
    key: "1",
    title: "Gift Pool Reminder",
    description: "Contribute to Emma's Birthday Gift Pool",
    time: "09:00 – 10:00",
    emoji: "🎉",
  },
  {
    key: "2",
    title: "RSVP Reminder",
    description: "Send RSVP for Olivia's Baby Shower",
    time: "12:00 – 13:00",
    emoji: "🎉",
  },
];

interface RemindersSectionProps {
  reminders?: typeof REMINDERS;
  onSeeAll?: () => void;
}

export default function RemindersSection({ reminders = REMINDERS, onSeeAll }: RemindersSectionProps) {
  const renderReminder = ({ item }: any) => (
    <TouchableOpacity style={styles.reminderCard}>
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.reminderDetails}>
        <Text style={styles.reminderTitle}>{item.title}</Text>
        <Text style={styles.reminderDescription}>{item.description}</Text>
      </View>
      <Text style={styles.reminderTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Reminders</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        style={styles.remindersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 8,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  seeAllText: {
    fontSize: 14,
    color: "#c93c7c",
    fontWeight: "bold",
  },
  remindersList: {},
  reminderCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f9d6db",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  emoji: {
    fontSize: 24,
  },
  reminderDetails: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  reminderDescription: {
    fontSize: 14,
    color: "#888",
    marginTop: 2,
  },
  reminderTime: {
    fontSize: 12,
    color: "#888",
    marginLeft: 8,
  },
});
