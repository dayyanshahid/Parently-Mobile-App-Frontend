import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const CALENDAR_DATES = [
  { key: "18", day: "Mo" },
  { key: "19", day: "Tu" },
  { key: "20", day: "Wed" },
  { key: "21", day: "Th", isToday: true },
  { key: "22", day: "Fr" },
  { key: "23", day: "Sa" },
  { key: "24", day: "Su" },
];

interface CalendarStripProps {
  onDateSelect?: (date: string) => void;
}

export default function CalendarStrip({ onDateSelect }: CalendarStripProps) {
  const renderCalendarDate = ({ key, day, isToday }: any) => (
    <TouchableOpacity 
      key={key} 
      style={[styles.calendarDate, isToday && styles.calendarDateToday]}
      onPress={() => onDateSelect?.(key)}
    >
      <Text style={[styles.calendarDateText, isToday && styles.calendarDateTextToday]}>{key}</Text>
      <Text style={[styles.calendarDayText, isToday && styles.calendarDayTextToday]}>{day}</Text>
      {isToday && <View style={styles.calendarDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.calendarStrip}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CALENDAR_DATES.map(renderCalendarDate)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarDateTextToday: {
    color: "#c93c7c",
  },
  calendarDayText: {
    color: "black",
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
});
