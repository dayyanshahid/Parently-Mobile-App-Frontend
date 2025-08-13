import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import StyledButton from "../components/StyledButton";

interface EventData {
  title: string;
  description: string;
  time: string;
  child: string;
  type: string;
}

export default function CreateEvent({ navigation }: any) {
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    time: "",
    child: "",
    type: "",
  });

  const handleInputChange = (field: keyof EventData, value: string) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveEvent = () => {
    console.log("Saving event:", eventData);
    navigation.goBack();
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <HeaderSection title="Create New Event" />
        <Text style={styles.subtitle}>Plan your event in a few simple steps</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Emma's 8th Birthday Party"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventData.title}
              onChangeText={(text) => handleInputChange("title", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Event Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Birthday, Dinner, Family Trip"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventData.type}
              onChangeText={(text) => handleInputChange("type", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter details here..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventData.description}
              onChangeText={(text) => handleInputChange("description", text)}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Host + Organiser(s)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Sarah Balmer"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={eventData.child}
              onChangeText={(text) => handleInputChange("child", text)}
            />
          </View>

          <StyledButton title="Next" onPress={handleSaveEvent} />
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    paddingBottom: 100,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 15,
    color: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
});
