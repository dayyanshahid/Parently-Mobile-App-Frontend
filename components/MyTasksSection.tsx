import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { Feather } from "@expo/vector-icons";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MY_TASKS = [
  { key: "1", title: "Harry – Soccer Practice", description: "Pack snacks and water" },
  { key: "2", title: "Family – Grocery Run", description: "Dinner prep for tomorrow" },
  { key: "3", title: "Emma – School Assembly", description: "Bring permission slip" },
  { key: "4", title: "John – Soccer Game", description: "Bring water and snacks" },
];

interface MyTasksSectionProps {
  tasks?: typeof MY_TASKS;
  onAddTask?: () => void;
  onFilterTasks?: () => void;
  onSeeAll?: () => void;
}

export default function MyTasksSection({ tasks = MY_TASKS, onAddTask, onFilterTasks, onSeeAll }: MyTasksSectionProps) {
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({});
  const [scaleAnim] = useState<{ [key: string]: Animated.Value }>({});

  const toggleTask = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCompletedTasks(prev => ({ ...prev, [key]: !prev[key] }));

    if (!scaleAnim[key]) scaleAnim[key] = new Animated.Value(1);

    Animated.sequence([
      Animated.spring(scaleAnim[key], { toValue: 1.3, useNativeDriver: true }),
      Animated.spring(scaleAnim[key], { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const renderTask = ({ item, index }: any, incompleteOrder: { [key: string]: number }) => {
    const isCompleted = completedTasks[item.key] || false;
    if (!scaleAnim[item.key]) scaleAnim[item.key] = new Animated.Value(1);

    const taskNumber = !isCompleted ? String(incompleteOrder[item.key]).padStart(2, "0") : "";

    return (
      <View style={styles.taskCard}>
        <View style={styles.taskNumberContainer}>
          {!isCompleted ? (
            <Text style={styles.taskNumber}>{taskNumber}</Text>
          ) : (
            <Text style={styles.completedText}>Complete</Text>
          )}
        </View>

        <View style={styles.taskDetails}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text style={styles.taskDescription}>{item.description}</Text>
        </View>

        <TouchableOpacity onPress={() => toggleTask(item.key)}>
          <Animated.View
            style={[
              styles.taskCheckButton,
              isCompleted && styles.taskCheckButtonCompleted,
              { transform: [{ scale: scaleAnim[item.key] }] },
            ]}
          >
            <Feather
              name="check"
              size={20}
              color={isCompleted ? "#fff" : "#929292ff"}
              style={{ fontWeight: isCompleted ? "bold" : "normal" }}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  // Compute order numbers for incomplete tasks dynamically
  const incompleteOrder: { [key: string]: number } = {};
  let counter = 1;
  tasks.forEach(task => {
    if (!completedTasks[task.key]) {
      incompleteOrder[task.key] = counter++;
    }
  });

  const orderedTasks = [...tasks].sort((a, b) => {
    const aCompleted = completedTasks[a.key] || false;
    const bCompleted = completedTasks[b.key] || false;
    return Number(aCompleted) - Number(bCompleted);
  });

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          My Tasks <Text style={styles.taskCount}>(0{tasks.length})</Text>
        </Text>
        <View style={styles.taskHeaderRight}>
          <TouchableOpacity style={styles.filterButtonSmall} onPress={onFilterTasks}>
            <Feather name="sliders" size={24} color="#EA479A" style={{ transform: [{ rotate: "90deg" }] }} />
          </TouchableOpacity>
          <View style={{ backgroundColor: "#E4E4E4", paddingHorizontal: 1, paddingVertical: 12, borderRadius: 36 }} />
          <TouchableOpacity style={styles.plusButtonSmall} onPress={onAddTask}>
            <Feather name="plus" size={24} color="#EA479A" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onSeeAll}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
      </View>

      {tasks.length > 0 ? (
        <FlatList
          data={orderedTasks}
          renderItem={(item) => renderTask(item, incompleteOrder)}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          style={styles.tasksList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}> No tasks yet! Add some tasks to see them here.</Text>
        </View>
      )}
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
    color: "#222",
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
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 2,
    backgroundColor: "#ffffffff",
    borderColor: "#ffffffff",
  },
  plusButtonSmall: {
    borderColor: "#ffffffff",
    backgroundColor: "#ffffffff",
    width: 36,
    height: 36,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  seeAllText: {
    color: "#c93c7c",
    fontWeight: "800",
    fontSize: 14,
  },
  tasksList: {
    marginTop: 10,
  },
  taskCard: {
    backgroundColor: "#ffffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f4f4f4",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    // elevation: 2,
    // shadowColor: "#00000062",
  },
  taskNumberContainer: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  taskNumber: {
    color: "#c93c7c",
    fontWeight: "bold",
    fontSize: 16,
  },
  completedText: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
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
    width: 30,
    height: 30,
    borderRadius: 16,
    borderWidth: 2.2,
    borderColor: "#b8b8b8ff",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  taskCheckButtonCompleted: {
    backgroundColor: "#c93c7c",
    borderColor: "#c93c7c",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
color: "#888", fontSize: 14, marginTop: 8, alignSelf: "center"
  },
});
