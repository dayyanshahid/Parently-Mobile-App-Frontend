import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import BottomNavigation from "../components/BottomNavigation";
import BackButton from "../components/BackButton";

const SCHEDULE_EVENTS = [
  {
    id: "1",
    time: "08:00",
    title: "Morning Routine",
    description: "Breakfast & getting ready",
    child: "Emma",
    type: "routine",
  },
  {
    id: "2",
    time: "09:00",
    title: "School Drop-off",
    description: "Emma & Harry",
    child: "Both",
    type: "transport",
  },
  {
    id: "3",
    time: "15:30",
    title: "Soccer Practice",
    description: "Harry's soccer training",
    child: "Harry",
    type: "activity",
  },
  {
    id: "4",
    time: "17:00",
    title: "Piano Lesson",
    description: "Emma's piano class",
    child: "Emma",
    type: "activity",
  },
];

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "routine":
        return "#4CAF50";
      case "transport":
        return "#2196F3";
      case "activity":
        return "#FF9800";
      default:
        return "#c93c7c";
    }
  };

  const renderScheduleEvent = (event: any) => (
    <TouchableOpacity key={event.id} style={styles.eventCard}>
      <View style={styles.timeContainer}>
        <Text style={styles.eventTime}>{event.time}</Text>
        <View 
          style={[
            styles.eventIndicator, 
            { backgroundColor: getEventTypeColor(event.type) }
          ]} 
        />
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDescription}>{event.description}</Text>
        <Text style={styles.eventChild}>👤 {event.child}</Text>
      </View>
      <TouchableOpacity style={styles.eventOptions}>
        <Feather name="more-horizontal" size={20} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.dateSelector}>
          <TouchableOpacity style={styles.dateButton}>
            <Feather name="chevron-left" size={20} color="#c93c7c" />
          </TouchableOpacity>
          <Text style={styles.dateText}>Today, Dec 21</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Feather name="chevron-right" size={20} color="#c93c7c" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scheduleList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scheduleContainer}>
            {SCHEDULE_EVENTS.map(renderScheduleEvent)}
          </View>
        </ScrollView>
      </View>

      <BottomNavigation activeTab="calendar" />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingTop: 20,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  scheduleList: {
    flex: 1,
  },
  scheduleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  eventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  timeContainer: {
    alignItems: "center",
    marginRight: 16,
  },
  eventTime: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  eventIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  eventChild: {
    fontSize: 12,
    color: "#888",
  },
  eventOptions: {
    padding: 8,
  },
});
