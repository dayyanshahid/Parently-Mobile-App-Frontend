import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import EventMat from "../components/EventMat";
import StyledButton from "../components/StyledButton";
import { router } from "expo-router";
import Feather from '@expo/vector-icons/Feather';

export default function eventInviteGuests({ navigation }: any) {
  const [guests, setGuests] = useState([
    { id: "1", name: "Sarah Thompson", role: "Guest", status: "Invited", color: "#E91E63" },
    { id: "2", name: "James Ali", role: "Guest", status: "Invited", color: "#3F51B5" },
    { id: "3", name: "Olivia Carter", role: "Guest", status: "Invited", color: "#FF9800" },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleAddGuest = () => {
    if (!inputValue.trim()) return;

    const newGuest = {
      id: Date.now().toString(),
      name: inputValue.trim(),
      role: "Guest",
      status: "Maybe",
      color: getRandomColor(),
    };

    setGuests([...guests, newGuest]);
    setInputValue("");
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(guests.filter((g) => g.id !== id));
  };

  return (
    <EventMat title="Invite Guests" subtitle="Add people to your event">
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: "12%" }}>
        {/* Icon + Title */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View style={styles.iconCircle}>
            <Feather name="user" size={40} color="#fff" />
          </View>
          <Text style={styles.title}>Invite Guests</Text>
        </View>

        {/* Input */}
        <Text style={styles.label}>Add Guests</Text>
        <TextInput
          placeholder="Type name or email to invite"
          style={styles.input}
          value={inputValue}
          onChangeText={setInputValue}
          onSubmitEditing={handleAddGuest}
        />

        <View style={{flex:1, flexDirection: 'row'}}>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>+ Import from Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>+ Import from Parently</Text>
          </TouchableOpacity>
        </View>
        {/* Guest list */}
        <Text style={styles.label}>Guests Invited</Text>
        {guests.map((guest) => (
          <View key={guest.id} style={styles.guestRow}>
            <View style={[styles.avatar, { backgroundColor: guest.color }]}>
              <Text style={styles.avatarText}>
                {guest.name.split(" ").map((n) => n[0]).join("")}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.guestName}>{guest.name}</Text>
              <Text style={styles.guestRole}>Role: {guest.role}</Text>
            </View>
            <View style={styles.statusChip}>
              <Text style={styles.statusText}>{guest.status}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemoveGuest(guest.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View style={{ marginBottom: 20, paddingHorizontal: "5%" }}>
        <StyledButton title="Next" onPress={() => router.push("/eventInformation")} />
      </View>
    </EventMat>
  );
}

function getRandomColor() {
  const colors = ["#E91E63", "#3F51B5", "#009688", "#FF9800", "#9C27B0", "#4CAF50"];
  return colors[Math.floor(Math.random() * colors.length)];
}

const styles = StyleSheet.create({
  iconCircle: {
    backgroundColor: "#e91e63",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 20,
    padding: 14,
    backgroundColor: "#fafafa",
    marginBottom: 20,
    fontSize: 16,
  },
  viewButton: {
    margin:2, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6, borderWidth: 1, borderColor: '#f0f0f0',
  },
  viewButtonText: { color: "#666", fontWeight: "bold", fontSize: 12 },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  guestName: {
    fontSize: 16,
    fontWeight: "500",
  },
  guestRole: {
    fontSize: 13,
    color: "#666",
  },
  statusChip: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    color: "#444",
  },
  removeText: {
    color: "red",
    fontSize: 13,
  },
});
