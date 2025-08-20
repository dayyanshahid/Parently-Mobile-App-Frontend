import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventMat from "../components/EventMat";
import StyledButton from "../components/StyledButton";
import { useRouter } from "expo-router";

interface EventData {
  title: string;
  description: string;
  time: string;
  child: string;
  type: string;
  host: string;
  role: "host" | "cohost";
}

export default function CreateEvent({ navigation }: any) {
  const router = useRouter();
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    time: "",
    child: "",
    type: "",
    host: "",
    role: "host",
  });

  const handleInputChange = (field: keyof EventData, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    console.log("Navigating to date/time with event data:", eventData);
    router.push("/eventDateTime");
  };

  return (
    <EventMat
      title="Create New Event"
      subtitle="Plan your event in a few simple steps"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: "12%" }}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon + Title */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <View
              style={{
                backgroundColor: "#e91e63",
                width: 70,
                height: 70,
                borderRadius: 35,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons name="person-circle-outline" size={40} color="#fff" />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Basic Info</Text>
          </View>

          {/* Event Title */}
          <Text style={{ marginBottom: 6, fontWeight: "500" }}>Event Title</Text>
          <TextInput
            placeholder="e.g. Emma's 8th Birthday Party"
            value={eventData.title}
            onChangeText={(text) => handleInputChange("title", text)}
            style={styles.input}
          />

          {/* Event Type */}
          <Text style={{ marginTop: 16, marginBottom: 6, fontWeight: "500" }}>
            Event Type
          </Text>
          <TextInput
            placeholder="e.g. Birthday, Dinner, Family Trip"
            value={eventData.type}
            onChangeText={(text) => handleInputChange("type", text)}
            style={styles.input}
          />

          {/* Description */}
          <Text style={{ marginTop: 16, marginBottom: 6, fontWeight: "500" }}>
            Description (Optional)
          </Text>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Enter details here..."
              value={eventData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
              multiline
            />
            <Ionicons
              name="mic-outline"
              size={22}
              color="gray"
              style={{ position: "absolute", right: 12, bottom: 12 }}
            />
          </View>

          {/* Host + Organiser */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 8,
            }}
          >
            <Text style={{ fontWeight: "500" }}>Host + Organiser(s)</Text>
            <Text style={{ color: "#e91e63", fontWeight: "600" }}>
              + Add another
            </Text>
          </View>
          <TextInput
            placeholder="e.g. Sarah Balmer"
            value={eventData.host}
            onChangeText={(text) => handleInputChange("host", text)}
            style={styles.input}
          />

          {/* Host / Co-host selection */}
          <View style={{ flexDirection: "row", marginTop: 12 }}>
            <TouchableOpacity
              style={styles.radioWrapper}
              onPress={() => handleInputChange("role", "host")}
            >
              <Ionicons
                name={
                  eventData.role === "host"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color={eventData.role === "host" ? "#e91e63" : "gray"}
              />
              <Text style={{ marginLeft: 6 }}>Host</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioWrapper, { marginLeft: 20 }]}
              onPress={() => handleInputChange("role", "cohost")}
            >
              <Ionicons
                name={
                  eventData.role === "cohost"
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={20}
                color={eventData.role === "cohost" ? "#e91e63" : "gray"}
              />
              <Text style={{ marginLeft: 6 }}>Co-host</Text>
            </TouchableOpacity>
          </View>

          {/* Next Button */}
          <View style={{ marginBottom: 20, paddingHorizontal: "5%", marginTop: 20 }}>
            <StyledButton title="Next" onPress={handleNext} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </EventMat>
  );
}

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  radioWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
});
