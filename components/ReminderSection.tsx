import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

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

interface ReminderItem {
  key: string;
  title: string;
  description: string;
  time: string;
  emoji: string;
}

interface RemindersSectionProps {
  reminders?: ReminderItem[];
  onSeeAll?: () => void;
  onPressReminder?: (reminder: ReminderItem) => void;
}

export default function RemindersSection({
  reminders = REMINDERS,
  onSeeAll,
  onPressReminder,
}: RemindersSectionProps) {
  const renderReminder = ({ item }: { item: ReminderItem }) => (
    <TouchableOpacity
      style={styles.reminderCard}
      activeOpacity={0.7}
      onPress={() => onPressReminder?.(item)}
    >
      <View style={styles.emojiContainer}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.reminderDetails}>
        <Text
          style={styles.reminderTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text
          style={styles.reminderDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
      </View>
      <Text style={styles.reminderTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View
        style={[
          styles.sectionHeader,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <Text style={styles.sectionTitle}>Reminders</Text>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} activeOpacity={0.6}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        )}
      </View>

      {reminders.length > 0 ? (
        <FlatList
          data={reminders}
          renderItem={renderReminder}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          style={styles.remindersList}
          initialNumToRender={3}
          removeClippedSubviews
        />
      ) : (
        <Text style={{ color: "#888", fontSize: 14, marginTop: 8, alignSelf: "center" }}>
          No reminders are set yet.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 8,
    marginVertical: 16,
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
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    borderColor: "#f4f4f4",
    borderWidth: 1,
    // elevation: 0,
  },
  emojiContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f9d6dbaf",
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
