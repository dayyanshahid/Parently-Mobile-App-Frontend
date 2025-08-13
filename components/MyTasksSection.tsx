import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const MY_TASKS = [
  {
    key: "1",
    number: "01",
    title: "Harry – Soccer Practice",
    description: "Pack snacks and water",
  },
  {
    key: "2",
    number: "01",
    title: "Family – Grocery Run",
    description: "Dinner prep for tomorrow",
  },
  {
    key: "3",
    number: "02",
    title: "Emma – School Assembly",
    description: "Bring permission slip",
  },
];

interface MyTasksSectionProps {
  tasks?: typeof MY_TASKS;
  onAddTask?: () => void;
  onFilterTasks?: () => void;
  onSeeAll?: () => void;
}

export default function MyTasksSection({ 
  tasks = MY_TASKS, 
  onAddTask, 
  onFilterTasks, 
  onSeeAll 
}: MyTasksSectionProps) {
  const renderTask = ({ item }: any) => (
    <View style={styles.taskCard}>
      <View style={styles.taskNumberContainer}>
        <Text style={styles.taskNumber}>{item.number}</Text>
      </View>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      <TouchableOpacity style={styles.taskCheckButton}>
        <Feather name="check" size={20} color="#c93c7c" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          My Tasks <Text style={styles.taskCount}>(05)</Text>
        </Text>
        <View style={styles.taskHeaderRight}>
          <TouchableOpacity style={styles.filterButtonSmall} onPress={onFilterTasks}>
            <Feather name="sliders" size={20} color="#c93c7c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusButtonSmall} onPress={onAddTask}>
            <Feather name="plus" size={20} color="#c93c7c" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.key}
        scrollEnabled={false}
        style={styles.tasksList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  taskCount: {
    color: "#888",
  },
  taskHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonSmall: {
    borderWidth: 1,
    borderColor: "#c93c7c",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  plusButtonSmall: {
    borderWidth: 1,
    borderColor: "#c93c7c",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  seeAllText: {
    color: "#c93c7c",
    fontWeight: "bold",
    fontSize: 14,
  },
  tasksList: {},
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  taskNumberContainer: {
    backgroundColor: "#f9d6db",
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskNumber: {
    color: "#c93c7c",
    fontWeight: "bold",
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "bold",
  },
  taskDescription: {
    color: "#888",
    fontSize: 14,
  },
  taskCheckButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#c93c7c",
    justifyContent: "center",
    alignItems: "center",
  },
});
