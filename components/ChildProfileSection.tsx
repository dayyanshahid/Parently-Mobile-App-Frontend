import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";

const CHILDREN = [
  { key: "1", name: "Emma", age: 8, avatar: "👧", isActive: true },
  { key: "2", name: "Harry", age: 6, avatar: "👦", isActive: false },
  { key: "3", name: "Olivia", age: 4, avatar: "👧", isActive: false },
];

interface ChildProfileSectionProps {
  onChildSelect?: (childId: string) => void;
  children?: typeof CHILDREN;
}

export default function ChildProfileSection({ 
  onChildSelect, 
  children = CHILDREN 
}: ChildProfileSectionProps) {
  const renderChildCard = ({ key, name, age, avatar, isActive }: any) => (
    <TouchableOpacity 
      key={key} 
      style={[styles.childCard, isActive && styles.childCardActive]}
      onPress={() => onChildSelect?.(key)}
    >
      <View style={[styles.avatarContainer, isActive && styles.avatarContainerActive]}>
        <Text style={styles.avatar}>{avatar}</Text>
      </View>
      <Text style={[styles.childName, isActive && styles.childNameActive]}>{name}</Text>
      <Text style={[styles.childAge, isActive && styles.childAgeActive]}>{age}y</Text>
      {isActive && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Children</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={16} color="#c93c7c" />
        </TouchableOpacity>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.childrenContainer}
      >
        {children.map(renderChildCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#c93c7c",
    justifyContent: "center",
    alignItems: "center",
  },
  childrenContainer: {
    paddingRight: 20,
  },
  childCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    minWidth: 80,
    position: "relative",
  },
  childCardActive: {
    backgroundColor: "#f9d6db",
    borderWidth: 2,
    borderColor: "#c93c7c",
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e9ecef",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarContainerActive: {
    backgroundColor: "#fff",
  },
  avatar: {
    fontSize: 24,
  },
  childName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  childNameActive: {
    color: "#c93c7c",
  },
  childAge: {
    fontSize: 12,
    color: "#888",
  },
  childAgeActive: {
    color: "#c93c7c",
  },
  activeIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#c93c7c",
  },
});
