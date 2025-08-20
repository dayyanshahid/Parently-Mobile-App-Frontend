import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

const TODAY_EVENTS = [
  {
    key: "1",
    time: "08.00",
    title: "Harry Soccer",
    icons: [
      { type: "emoji", value: "⚽" },
      { type: "avatar", value: "👦" },
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

export default function TodayEventsSection({ events = TODAY_EVENTS, onAddEvent, onSeeAll }: TodayEventsSectionProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const renderEventIcons = (icons: any[]) => (
    <View style={styles.eventIconsContainer}>
      {icons.map((icon, idx) => {
        if (icon.type === "emoji") return <Text key={idx} style={styles.eventEmoji}>{icon.value}</Text>;
        if (icon.type === "avatar") return (
          <View key={idx} style={styles.avatarPlaceholder}>
            <Text style={{ fontSize: 14 }}>{icon.value}</Text>
          </View>
        );
        return null;
      })}
    </View>
  );

  const renderTodayEvent = ({ item }: any) => {
    const isSelected = selectedKey === item.key;

    return (
      <View style={styles.eventRow}>
        {/* Time outside the elevated card */}
        <Text style={styles.eventTime}>{item.time}</Text>

        {/* Elevated card for the rest */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setSelectedKey(item.key)}
          style={[styles.todayEventCard,
    isSelected && styles.selectedEventCard,
          
          ]}
        >
          <View style={styles.eventDetails}>
            <Text style={styles.eventTitle}>{item.title}</Text>
          </View>
          {renderEventIcons(item.icons)}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today</Text>
        <View style={styles.headerButtons}>
          {onAddEvent && (
            <TouchableOpacity style={styles.plusButton} onPress={onAddEvent}>
              <Feather name="plus" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          {onSeeAll && (
            <TouchableOpacity onPress={onSeeAll} style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          )}
        </View>
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
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#222",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  plusButton: {
    backgroundColor: "#c93c7c",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  seeAllButton: {
    justifyContent: "center",
  },
  seeAllText: {
    color: "#fe3ad3ff",
    fontWeight: "600",
    fontSize: 14,
  },
  todayEventsList: {
    marginBottom: 24,
    marginTop:10,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  todayEventCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#f4f4f4",
    marginLeft: 12,
  },
  selectedEventCard: {
    borderColor: "#ff000095",
    borderWidth: 1
  },
  eventTime: {
    color: "#888",
    width: 56,
    fontSize: 14,
  },
  eventDetails: {
    flex: 1,
    marginRight: 8,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f2f1f0",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
});
