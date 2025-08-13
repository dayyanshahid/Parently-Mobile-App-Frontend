import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import BottomNavigation from "../components/BottomNavigation";

const mockEvent = {
  title: "Alex's Birthday Party",
  location: "Riverside Park, Australia",
  date: "Sat, January 20, 2025",
  time: "Tuesday, 4:00 PM - 9:00 PM",
  attendees: 7,
  invited: 20,
  venue: "Funzone Play Center, 123 Main St, City, State",
  weather: "Sunny, 72°F",
  description: "Join us for Alex's magical 8th birthday celebration! We'll have games, cake, face painting, a bounce house, and lots of fun activities for all the kids. Parents are welcome to stay and enjoy refreshments while the kids play.",
};

export default function EventDetails({ navigation }: any) {
  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <HeaderSection title="Event Detail" />
        
        <View style={styles.imageContainer}>
          <Text style={styles.imagePlaceholder}>Add Image</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.eventTitle}>{mockEvent.title}</Text>
          <Text style={styles.eventLocation}>{mockEvent.location}</Text>
          
          <View style={styles.infoRow}>
            <Feather name="calendar" size={20} color="#fff" />
            <Text style={styles.infoText}>{mockEvent.date}</Text>
            <Text style={styles.infoText}>{mockEvent.time}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="users" size={20} color="#fff" />
            <Text style={styles.infoText}>{mockEvent.attendees} attending of {mockEvent.invited} invited</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="map-pin" size={20} color="#fff" />
            <Text style={styles.infoText}>{mockEvent.venue}</Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="sun" size={20} color="#fff" />
            <Text style={styles.infoText}>{mockEvent.weather}</Text>
          </View>

          <Text style={styles.aboutTitle}>About Event</Text>
          <Text style={styles.descriptionText}>{mockEvent.description}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNavigation />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    color: "#fff",
    fontSize: 18,
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  eventLocation: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    color: "#fff",
    marginLeft: 10,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },
  descriptionText: {
    color: "#fff",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    margin: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
