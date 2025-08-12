import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import StyledButton from "../components/StyledButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const HEADER_ICONS = [
  { name: "search", key: "search" },
  { name: "bell", key: "bell", hasDot: true },
  { name: "plus", key: "plus" },
];

const INFO_CARDS = [
  { key: "upcoming", label: "Upcoming", count: "03" },
  { key: "tasks", label: "My Tasks", count: "15" },
];

const CALENDAR_DATES = [
  { key: "18", day: "Mo" },
  { key: "19", day: "Tu" },
  { key: "20", day: "Wed" },
  { key: "21", day: "Th", isToday: true },
  { key: "22", day: "Fr" },
  { key: "23", day: "Sa" },
  { key: "24", day: "Su" },
];

const TODAY_EVENTS = [
  {
    key: "1",
    time: "08.00",
    title: "Harry Soccer",
    icons: [
      { type: "emoji", value: "⚽" },
      { type: "avatar", value: "👧" },
    ],
  },
  {
    key: "2",
    time: "12.00",
    title: "School Assembly",
    icons: [
      { type: "avatar", value: "👧" },
      { type: "avatar", value: "👦" },
    ],
  },
  {
    key: "3",
    time: "16.00",
    title: "Buy decorations for Emma's Party",
    icons: [{ type: "emoji", value: "🎉" }],
  },
];

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


import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import GradientBackground from "../components/GradientBackground";
import StyledButton from "../components/StyledButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const HEADER_ICONS = [
  { name: "search", key: "search" },
  { name: "bell", key: "bell", hasDot: true },
  { name: "plus", key: "plus" },
];

const INFO_CARDS = [
  { key: "upcoming", label: "Upcoming", count: "03" },
  { key: "tasks", label: "My Tasks", count: "15" },
];

const CALENDAR_DATES = [
  { key: "18", day: "Mo" },
  { key: "19", day: "Tu" },
  { key: "20", day: "Wed" },
  { key: "21", day: "Th", isToday: true },
  { key: "22", day: "Fr" },
  { key: "23", day: "Sa" },
  { key: "24", day: "Su" },
];

const TODAY_EVENTS = [
  {
    key: "1",
    time: "08.00",
    title: "Harry Soccer",
    icons: [
      { type: "emoji", value: "⚽" },
      { type: "avatar", value: "👧" },
    ],
  },
  {
    key: "2",
    time: "12.00",
    title: "School Assembly",
    icons: [
      { type: "avatar", value: "👧" },
      { type: "avatar", value: "👦" },
    ],
  },
  {
    key: "3",
    time: "16.00",
    title: "Buy decorations for Emma's Party",
    icons: [{ type: "emoji", value: "🎉" }],
  },
];

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

export default function HomeScreen() {
  const router = useRouter();

  const handleVerifyPress = () => {
    router.push("/verificationscreen");
  };

  const renderHeaderIcon = ({ name, hasDot, key }) => (
    <TouchableOpacity key={key} style={styles.iconButton}>
      <Feather name={name} size={20} color="#fff" />
      {hasDot && <View style={styles.redDot} />}
    </TouchableOpacity>
  );

  const renderInfoCard = ({ count, label, key }) => (
    <View key={key} style={styles.infoCard}>
      <Text style={styles.infoCount}>{count}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );

  const renderCalendarDate = ({ key, day, isToday }) => (
    <TouchableOpacity key={key} style={[styles.calendarDate, isToday && styles.calendarDateToday]}>
      <Text style={[styles.calendarDateText, isToday && styles.calendarDateTextToday]}>{key}</Text>
      <Text style={[styles.calendarDayText, isToday && styles.calendarDayTextToday]}>{day}</Text>
      {isToday && <View style={styles.calendarDot} />}
    </TouchableOpacity>
  );

  const renderEventIcons = (icons) => (
    <View style={styles.eventIconsContainer}>
      {icons.map((icon, idx) => {
        if (icon.type === "emoji") {
          return (
            <Text key={idx} style={styles.eventEmoji}>
              {icon.value}
            </Text>
          );
        } else if (icon.type === "avatar") {
          return (
            <View key={idx} style={styles.avatarPlaceholder}>
              <Text style={{ fontSize: 14 }}>{icon.value}</Text>
            </View>
          );
        }
        return null;
      })}
    </View>
  );

  const renderTodayEvent = ({ item }) => (
    <View style={styles.todayEventCard}>
      <Text style={styles.eventTime}>{item.time}</Text>
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
      {renderEventIcons(item.icons)}
    </View>
  );

  const renderTask = ({ item }) => (
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
    <GradientBackground style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>PARENTLY</Text>
          <View style={styles.headerIconsContainer}>
            {HEADER_ICONS.map(renderHeaderIcon)}
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoCardsContainer}>
          {INFO_CARDS.map(renderInfoCard)}
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="sliders" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Calendar Strip */}
        <View style={styles.calendarStrip}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CALENDAR_DATES.map(renderCalendarDate)}
          </ScrollView>
        </View>

        {/* Today Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <TouchableOpacity style={styles.plusButton}>
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={TODAY_EVENTS}
          renderItem={renderTodayEvent}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          style={styles.todayEventsList}
        />

        {/* My Tasks Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            My Tasks <Text style={styles.taskCount}>(05)</Text>
          </Text>
          <View style={styles.taskHeaderRight}>
            <TouchableOpacity style={styles.filterButtonSmall}>
              <Feather name="sliders" size={20} color="#c93c7c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.plusButtonSmall}>
              <Feather name="plus" size={20} color="#c93c7c" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={MY_TASKS}
          renderItem={renderTask}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          style={styles.tasksList}
        />
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  headerIconsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    position: "relative",
  },
  redDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff3b30",
  },
  infoCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: (width - 80) / 2,
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
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  calendarStrip: {
    marginBottom: 20,
  },
  calendarDate: {
    width: 44,
    height: 72,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  calendarDateToday: {
    backgroundColor: "#f9d6db",
  },
  calendarDateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarDateTextToday: {
    color: "#c93c7c",
  },
  calendarDayText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
  },
  calendarDayTextToday: {
    color: "#c93c7c",
  },
  calendarDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#c93c7c",
    marginTop: 6,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    flex: 1,
  },
  plusButton: {
    backgroundColor: "#c93c7c",
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
  todayEventsList: {
    marginBottom: 24,
  },
  todayEventCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  eventTime: {
    color: "#888",
    width: 56,
    fontSize: 14,
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    color: "#222",
    fontSize: 16,
  },
  eventIconsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  eventEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  avatarPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
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
  verifyBtn: {
    backgroundColor: "#c93c7c",
    borderRadius: 32,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 24,
    flexDirection: "row",
  },
});
