import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventMat from "../components/EventMat";
import StyledButton from "../components/StyledButton";
import { useRouter } from "expo-router";

interface LocationData {
  venue: string;
  address: string;
  notes: string;
}

export default function EventLocation() {
  const router = useRouter();
  const [locationData, setLocationData] = useState<LocationData>({
    venue: "",
    address: "",
    notes: "",
  });

  const handleInputChange = (field: keyof LocationData, value: string) => {
    setLocationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    console.log("Navigating to guests screen with location data:", locationData);
    router.push("/eventInviteGuests"); // next screen
  };

  return (
    <EventMat
      title="What is the location?"
      subtitle="Where are you holding this event?"
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: "12%" }}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon + Title */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <View style={styles.iconWrapper}>
            <Ionicons name="location-outline" size={40} color="#fff" />
          </View>
          <Text style={styles.sectionTitle}>Location</Text>
        </View>

        {/* Location/Venue */}
        <Text style={styles.label}>Location/Venue</Text>
        <TextInput
          placeholder="e.g. Sunset Park"
          value={locationData.venue}
          onChangeText={(text) => handleInputChange("venue", text)}
          style={styles.input}
        />

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="ABC Street 2, Melbourne"
          value={locationData.address}
          onChangeText={(text) => handleInputChange("address", text)}
          style={styles.input}
        />

        {/* Directions / Notes */}
        <Text style={styles.label}>Directions / Notes (Optional)</Text>
        <View style={{ position: "relative" }}>
          <TextInput
            placeholder="Add directions or pin a location"
            value={locationData.notes}
            onChangeText={(text) => handleInputChange("notes", text)}
            style={styles.input}
          />
          <Ionicons
            name="location-sharp"
            size={20}
            color="#e91e63"
            style={{ position: "absolute", right: 12, top: 14 }}
          />
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={{ marginBottom: 20, paddingHorizontal: "5%" }}>
        <StyledButton title="Next" onPress={handleNext} />
      </View>
    </EventMat>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    backgroundColor: "#e91e63",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  sectionTitle: {
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
});
