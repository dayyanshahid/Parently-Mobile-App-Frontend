import React, { useState } from "react";
import SlidingPopup from "./SlidingPopup";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const INFO_CARDS = [
  { key: "upcoming", label: "Upcoming", count: "03" },
  { key: "tasks", label: "My Tasks", count: "15" },
];

interface InfoCardsSectionProps {
  onFilterPress?: () => void;
}

export default function InfoCardsSection({ onFilterPress }: InfoCardsSectionProps) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleFilterPress = () => {
    console.log("Filter button pressed"); // Log statement added
    setPopupVisible(true); // Ensure the popup opens
    if (onFilterPress) {
      onFilterPress();
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const renderInfoCard = ({ count, label, key }: any) => (
    <View style={{ width: (width - 100) / 2 , borderRadius: 18, overflow: 'hidden', margin:'0.5%', alignSelf: 'center' }} key={key}>
      <BlurView key={key} style={styles.infoCard} tint="light" experimentalBlurMethod="dimezisBlurView" intensity={17} blurReductionFactor={5}>
        <Text style={styles.infoCount}>{count}</Text>
        <Text style={styles.infoLabel}>{label}</Text>
      </BlurView>
    </View>
  );

  return (
    <View style={styles.infoCardsContainer}>
      {INFO_CARDS.map(renderInfoCard)}
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
        <Feather name="sliders" size={20} color="#000000ff" />
      </TouchableOpacity>
      <SlidingPopup visible={isPopupVisible} onClose={closePopup} />
    </View>
  );
}

const styles = StyleSheet.create({
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginInlineEnd: '10%',
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "rgba(111, 111, 111, 0.29)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: (width - 80) / 2,
  },
  infoCount: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  infoLabel: {
    color: "#fff",
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    transform: [{ rotate: '90deg' }] 
  },
});
