import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import EventMat from "../components/EventMat";
import BottomNavigation from "../components/BottomNavigation";

const NOTIFICATIONS = [
  {
    key: "1",
    title: "Event Reminder",
    description: "Don't forget the Family Movie Night on June 28!",
    time: "2 hours ago",
    category: "Family",
  },
  {
    key: "2",
    title: "RSVP Reminder",
    description: "Please RSVP for Olivia's Baby Shower.",
    time: "1 day ago",
    category: "Friends",
  },
  {
    key: "3",
    title: "Task Update",
    description: "You have a new task assigned: 'Prepare for the school play'.",
    time: "3 days ago",
    category: "Work",
  },
  {
    key: "4",
    title: "New Message",
    description: "You have a new message from Sarah.",
    time: "5 days ago",
    category: "Friends",
  },
  {
    key: "5",
    title: "Event Cancellation",
    description: "The Family Picnic has been cancelled.",
    time: "1 week ago",
    category: "Family",
  },
  {
    key: "6",
    title: "New Event Added",
    description: "A new event has been added to your calendar: 'Family Game Night'.",
    time: "1 week ago",
    category: "Family",
  },
];

const CATEGORIES = ["All", "Family", "Friends", "Work"];

export default function NotificationsScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter notifications
  const filteredNotifications =
    selectedCategory === "All"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((item) => item.category === selectedCategory);

  // Render notification card
  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  // Render category button
  const renderCategory = ({ item }) => {
    const isActive = selectedCategory === item;
    return (
      <TouchableOpacity
        style={[styles.categoryButton, isActive && styles.categoryButtonActive]}
        onPress={() => setSelectedCategory(item)}
        activeOpacity={0.8}
      >
        <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <EventMat title="Reminders">
      <View style={styles.container}>
        {/* Categories */}
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />

        {/* Notifications */}
        <FlatList
          data={filteredNotifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.notificationList}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomNavigation />
    </EventMat>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginTop: 10,
    backgroundColor: "#fff",
  },

  // Categories
  categoryList: {
    marginTop: 10,
    // paddingHorizontal: 10,
    // paddingBottom: 8,
  },
  categoryButton: {
    height: 40,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryButtonActive: {
    backgroundColor: "#fd5492ff",
  },
  categoryText: {
    color: "#000",
    fontSize: 15,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  // Notifications
  notificationList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  notificationCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    padding: 12,
    marginBottom: 10,
    width: "100%", // make cards stretch instead of centering
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  notificationTitle: {
    fontWeight: "bold",
    marginBottom: 2,
    color: "#333",
    fontSize: 16,
    lineHeight: 20,
  },
  notificationDescription: {
    color: "#555",
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 18,
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 4,
  },
});
