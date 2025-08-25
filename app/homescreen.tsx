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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function HomeScreen() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const { height } = Dimensions.get("window");

  const handleFilterPress = () => {
    setPopupVisible(prev => !prev);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const kids = ["Harry Looker", "Georgia Looker", "changes height dynamically with more kids"];
  const totalOptions = kids.length + 1;
  const optionHeight = 55;
  const dynamicPopupHeight = Math.min(height * 0.8, totalOptions * optionHeight + 100);


  const RadioButton = ({ label, value, selected, onSelect }) => (
  <TouchableOpacity activeOpacity={3} style={styles.radioButtonContainer} onPress={() => onSelect(value)}>
    <Text style={styles.radioButtonLabel}>{label}</Text>
    <View style={[styles.circle, selected ? styles.circleSelected : styles.circleUnselected]}>
      <Icon name="check-bold" size={18} color="#fff" /> 
    </View>
  </TouchableOpacity>
);

  const PopupContent = () => (
  <ScrollView contentContainerStyle={styles.popupContent} showsVerticalScrollIndicator={false}>  
  <View style={styles.popupContent}>
    <Text style={styles.popupTitle}>Filter by</Text>

    {/* All Members option */}
    <RadioButton
      label="All Members"
      value="all"
      selected={selectedOption === "all"}
      onSelect={setSelectedOption}
    />

    {/* Kids dynamic list */}
    {kids.map((kid, index) => (
      <RadioButton
        key={index}
        label={kid}
        value={kid}
        selected={selectedOption === kid}
        onSelect={setSelectedOption}
      />
    ))}
  </View>
  </ScrollView>
);

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <HeaderSection />
        <InfoCardsSection onFilterPress={handleFilterPress} />
      </View>
      <View style={styles.body}>
        {/* <View style={styles.staticcontent}>
        <CalendarStrip />
        </View> */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <CalendarStrip/>
          <TodayEventsSection onAddEvent={() => alert("Add pressed")} onSeeAll={() => alert("See all pressed")}/>
          <MyTasksSection />
          <RemindersSection />
        </ScrollView>
      </View>
      <BottomNavigation activeTab="home" />
      <SlidingPopup
        visible={isPopupVisible}
        onClose={closePopup}
        customView={<PopupContent />}
        // popupHeight={height * 0.35}
        popupHeight={dynamicPopupHeight}
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
  // staticcontent: {
  // width: "96%",
  // paddingTop: 10,
  // alignContent: "center",
  // alignSelf: "center",
  // borderRadius: 36,
  // },
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
    justifyContent: "space-between",
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
    color: "#333333dd",
    fontWeight: "600",
  },

  circle: {
  width: 24,
  height: 24,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
},
circleUnselected: {
  backgroundColor: "grey",
},
circleSelected: {
  backgroundColor: "#ff00aa", // pink
},

});
