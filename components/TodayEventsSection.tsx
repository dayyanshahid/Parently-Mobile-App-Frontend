import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const TODAY_EVENTS = [
  {
    key: "1",
    time: "08.00",
    title: "Harry Soccer",
    icons: [
      { type: "emoji", value: "⚽" },
      { type: "avatar", value: "👧" },
    ],
  },
  {
    key: "2",
    time: "12.00",
    title: "School Assembly",
    icons: [
      { type: "avatar", value: "👧" },
      { type: "avatar", value: "👦" },
    ],
  },
  {
    key: "3",
    time: "16.00",
    title: "Buy decorations for Emma's Party",
    icons: [{ type: "emoji", value: "🎉" }],
  },
];

interface TodayEventsSectionProps {
  events?: typeof TODAY_EVENTS;
  onAddEvent?: () => void;
  onSeeAll?: () => void;
}

export default function TodayEventsSection({ 
  events = TODAY_EVENTS, 
  onAddEvent, 
  onSeeAll 
}: TodayEventsSectionProps) {
  const renderEventIcons = (icons: any[]) => (
    <View style={styles.eventIconsContainer}>
      {icons.map((icon, idx) => {
        if (icon.type === "emoji") {
          return (
            <Text key={idx} style={styles.eventEmoji}>
              {icon.value}
            </Text>
          );
        } else if (icon.type === "avatar") {
          return (
            <View key={idx} style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 14 }}>{icon.value}</Text>
            </View>
          );
        }
        return null;
      })}
    </View>
  );

  const renderTodayEvent = ({ item }: any) => (
    <View style={styles.todayEventCard}>
      <Text style={styles.eventTime}>{item.time}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
      {renderEventIcons(item.icons)}
    </View>
  );

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today</Text>
        <TouchableOpacity style={styles.plusButton} onPress={onAddEvent}>
          <Feather name="plus" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={events}
        renderItem={renderTodayEvent}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        style={styles.todayEventsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  plusButton: {
    backgroundColor: "#c93c7c",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  seeAllText: {
    color: "#c93c7c",
    fontWeight: "bold",
    fontSize: 14,
  },
  todayEventsList: {
    marginBottom: 24,
  },
  todayEventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  eventTime: {
    color: "#888",
    width: 56,
    fontSize: 14,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    color: "#222",
    fontSize: 16,
  },
  eventIconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  eventEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});
