import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from "react-native";

const { height } = Dimensions.get("window");

const SlidingPopup = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position is off-screen

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: height * 0.6, // Slide up to cover 40% of the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height, // Slide down to hide
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.popup, { transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity style={styles.handle} onPress={onClose} />
      <Text style={styles.title}>Filter by</Text>
      {/* Add your filter options here */}
      <TouchableOpacity style={styles.applyButton} onPress={onClose}>
        <Text style={styles.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: "#ff4081",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SlidingPopup;
