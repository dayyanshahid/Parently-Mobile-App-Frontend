import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
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
  return (
    <View style={styles.infoCardsContainer}>
      {INFO_CARDS.map(({ key, label, count }) => (
        <View key={key} style={{ width: (width - 100) / 2, borderRadius: 18, overflow: 'hidden', margin: '0.5%', alignSelf: 'center' }}>
          {/* <BlurView tint="light" style={styles.infoCard} intensity={17}> */}
          <BlurView {...(Platform.OS === 'android' ? { experimentalBlurMethod: 'dimezisBlurView' } : {})} tint="dark" intensity={15} style={styles.infoCard}> 
            <Text style={styles.infoCount}>{count}</Text>
            <Text style={styles.infoLabel}>{label}</Text>
          </BlurView>
        </View>
      ))}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Feather name="sliders" size={15} color="black" style={{ transform: [{ rotate: '90deg' }] }} />
      </TouchableOpacity>
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
  },
  infoCount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  infoLabel: {
    color: "#fff",
    fontSize: 14,
  },
  filterButton: {
    backgroundColor: "#fff",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
