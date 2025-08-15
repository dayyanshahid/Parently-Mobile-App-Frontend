import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Dimensions } from "react-native";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import InfoCardsSection from "../components/InfoCardsSection";
import CalendarStrip from "../components/CalendarStrip";
import TodayEventsSection from "../components/TodayEventsSection";
import MyTasksSection from "../components/MyTasksSection";
import RemindersSection from "../components/ReminderSection";
import BottomNavigation from "../components/BottomNavigation";
import SlidingPopup from "../components/SlidingPopup";

export default function HomeScreen() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option1");

  const { height } = Dimensions.get("window");

  const handleFilterPress = () => {
    setPopupVisible(prev => !prev);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const RadioButton = ({ label, value, selected, onSelect }) => (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={() => onSelect(value)}>
      <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
        {selected && <View style={styles.radioButtonInner} />}
      </View>
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const PopupContent = () => (
    <View style={styles.popupContent}>
      <Text style={styles.popupTitle}>Select Your Preference:</Text>

      <RadioButton label="Show All Events" value="option1" selected={selectedOption === "option1"} onSelect={setSelectedOption} />
      <RadioButton label="Show Only Today's Events" value="option2" selected={selectedOption === "option2"} onSelect={setSelectedOption} />
      <RadioButton label="Show Upcoming Events" value="option3" selected={selectedOption === "option3"} onSelect={setSelectedOption} />
      <RadioButton label="Show Past Events" value="option4" selected={selectedOption === "option4"} onSelect={setSelectedOption} />
    </View>
  );

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <HeaderSection />
        <InfoCardsSection onFilterPress={handleFilterPress} />
      </View>
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CalendarStrip />
          <TodayEventsSection />
          <MyTasksSection />
          <RemindersSection />
        </ScrollView>
      </View>
      <BottomNavigation activeTab="home" />
      <SlidingPopup
        visible={isPopupVisible}
        onClose={closePopup}
        customView={<PopupContent />}
        popupHeight={height * 0.3} // height of popup
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, bottom: 0 },
  header: { padding: "4%", zIndex: 1 },
  body: {
    flex: 1,
    paddingTop: "1%",
    borderRadius: 36,
    backgroundColor: "white",
  },
  scrollContent: {
    paddingTop: "4%",
    paddingBottom: "30%",
    paddingHorizontal: "6.5%",
    backgroundColor: "transparent",
    borderRadius: 36,
  },
  popupContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    height: "100%",
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff00aaff",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#f200ffff",
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  radioButtonLabel: {
    fontSize: 16,
    color: "#333",
  },
});
