import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import BottomNavigation from "../components/BottomNavigation";

interface EventItem {
  id: string;
  title: string;
  time: string;
  date: string;
  child: string;
  type: "school" | "activity" | "appointment" | "other";
  description: string;
}

const mockEvents: EventItem[] = [
  {
    id: "1",
    title: "Soccer Practice",
    time: "4:00 PM",
    date: "Today",
    child: "Alex",
    type: "activity",
    description: "Weekly soccer practice session",
  },
  {
    id: "2",
    title: "Math Test",
    time: "10:00 AM",
    date: "Tomorrow",
    child: "Emma",
    type: "school",
    description: "Chapter 5 test on algebra",
  },
  {
    id: "3",
    title: "Doctor Appointment",
    time: "2:30 PM",
    date: "Mar 16",
    child: "Sophia",
    type: "appointment",
    description: "Annual checkup with Dr. Smith",
  },
  {
    id: "4",
    title: "Piano Recital",
    time: "6:00 PM",
    date: "Mar 17",
    child: "Alex",
    type: "activity",
    description: "Spring piano recital performance",
  },
  {
    id: "5",
    title: "Science Fair",
    time: "9:00 AM",
    date: "Mar 18",
    child: "Emma",
    type: "school",
    description: "Annual school science fair",
  },
];

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "This Week", value: "week" },
];

const TYPE_OPTIONS = [
  { label: "All Types", value: "all" },
  { label: "School", value: "school" },
  { label: "Activity", value: "activity" },
  { label: "Appointment", value: "appointment" },
  { label: "Other", value: "other" },
];

export default function EventList({ navigation }: any) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const getEventIcon = (type: string) => {
    switch (type) {
      case "school":
        return "book";
      case "activity":
        return "activity";
      case "appointment":
        return "calendar";
      default:
        return "clock";
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "school":
        return "#4CAF50";
      case "activity":
        return "#FF9800";
      case "appointment":
        return "#2196F3";
      default:
        return "#9C27B0";
    }
  };

  const filteredEvents = mockEvents.filter((event) => {
    if (selectedType !== "all" && event.type !== selectedType) return false;
    
    if (selectedFilter === "today" && event.date !== "Today") return false;
    if (selectedFilter === "tomorrow" && event.date !== "Tomorrow") return false;
    
    return true;
  });

  const renderEventItem = ({ item }: { item: EventItem }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate("eventDetails", { event: item })}
    >
      <View style={[styles.eventIcon, { backgroundColor: getEventColor(item.type) }]}>
        <Feather name={getEventIcon(item.type)} size={20} color="#fff" />
      </View>
      
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventTime}>{item.time} • {item.date}</Text>
        <Text style={styles.eventChild}>For {item.child}</Text>
        <Text style={styles.eventDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      
      <Feather name="chevron-right" size={24} color="rgba(255, 255, 255, 0.5)" />
    </TouchableOpacity>
  );

  const renderFilterChips = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterTitle}>Filter by Date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {FILTER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterChip,
              selectedFilter === option.value && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedFilter(option.value)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === option.value && styles.filterChipTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={[styles.filterTitle, { marginTop: 15 }]}>Filter by Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {TYPE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterChip,
              selectedType === option.value && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedType(option.value)}
          >
            <Text
              style={[
                styles.filterChipText,
                selectedType === option.value && styles.filterChipTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <GradientBackground>
      <View style={styles.container}>
        <HeaderSection title="All Events" />
        
        <ScrollView style={styles.contentContainer}>
          {renderFilterChips()}
          
          <View style={styles.eventsContainer}>
            <Text style={styles.eventsTitle}>
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? "s" : ""} Found
            </Text>
            
            {filteredEvents.length > 0 ? (
              <FlatList
                data={filteredEvents}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                contentContainerStyle={styles.eventsList}
              />
            ) : (
              <View style={styles.emptyState}>
                <Feather name="calendar" size={48} color="rgba(255, 255, 255, 0.3)" />
                <Text style={styles.emptyStateText}>No events found</Text>
                <Text style={styles.emptyStateSubtext}>
                  Try adjusting your filters or add new events
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        
        <BottomNavigation />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    marginVertical: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  filterScroll: {
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  filterChipSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderColor: "#fff",
  },
  filterChipText: {
    color: "#fff",
    fontSize: 14,
  },
  filterChipTextSelected: {
    fontWeight: "bold",
  },
  eventsContainer: {
    marginTop: 20,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
  },
  eventsList: {
    paddingBottom: 20,
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  eventTime: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  eventChild: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 2,
  },
  eventDescription: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 15,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.5)",
    marginTop: 5,
    textAlign: "center",
  },
});
