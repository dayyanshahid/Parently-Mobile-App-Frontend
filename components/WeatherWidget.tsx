import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface WeatherWidgetProps {
  temperature?: string;
  condition?: string;
  location?: string;
  onPress?: () => void;
}

export default function WeatherWidget({ 
  temperature = "22°C",
  condition = "Sunny",
  location = "New York",
  onPress 
}: WeatherWidgetProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "sun";
      case "cloudy":
        return "cloud";
      case "rainy":
        return "cloud-rain";
      case "stormy":
        return "cloud-lightning";
      default:
        return "sun";
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.weatherInfo}>
        <View style={styles.leftSection}>
          <Text style={styles.temperature}>{temperature}</Text>
          <Text style={styles.condition}>{condition}</Text>
          <Text style={styles.location}>{location}</Text>
        </View>
        <View style={styles.rightSection}>
          <View style={styles.iconContainer}>
            <Feather 
              name={getWeatherIcon(condition)} 
              size={32} 
              color="#FFA726" 
            />
          </View>
          <Text style={styles.suggestion}>Perfect for outdoor play!</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  weatherInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flex: 1,
  },
  temperature: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  condition: {
    fontSize: 16,
    color: "#666",
    marginBottom: 2,
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
  rightSection: {
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  suggestion: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "500",
    textAlign: "center",
    maxWidth: 100,
  },
});
