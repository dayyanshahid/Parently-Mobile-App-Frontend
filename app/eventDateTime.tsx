import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EventMat from "../components/EventMat";
import StyledButton from "../components/StyledButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

export default function EventDateTime({ navigation }: any) {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [repeat, setRepeat] = useState("Does not repeat");

  const [activeField, setActiveField] = useState<
    "date" | "start" | "end" | null
  >(null);

  const handleSave = () => {
    console.log("Date & Time:", { date, startTime, endTime, repeat });
    router.push("/eventLocation"); // next screen
  };

  // Shared handler for Android pickers to close modal on set/dismiss
  const handleAndroidChange =
    (setter: (d: Date) => void, fallback: Date | null = new Date()) =>
    (event: any, selected?: Date | undefined) => {
      if (event?.type === "set") {
        const chosen = selected ?? fallback ?? new Date();
        setter(chosen);
      }
      setActiveField(null);
    };

  return (
    <EventMat
      title="Let's get started"
      subtitle="Set the date and time to schedule your event easily."
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: "12%" }}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon + Title */}
          <View style={{ alignItems: "center", marginBottom: 20 }}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={32} color="#fff" />
            </View>
            <Text style={styles.title}>Date & Time</Text>
          </View>

          {/* Date */}
          <Text style={styles.label}>Date</Text>
          <View style={styles.inputRow}>
            {activeField === "date" ? (
              Platform.OS === "android" ? (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="default"
                  minimumDate={new Date()} // ✅ block past dates
                  onChange={handleAndroidChange((d) => setDate(d), date ?? new Date())}
                  {...(Platform.OS === "android"
                    ? { accentColor: "#EA479A" as any, positiveButtonLabel: "OK" }
                    : {})}
                />
              ) : (
                <DateTimePicker
                  value={date || new Date()}
                  mode="date"
                  display="spinner"
                  minimumDate={new Date()} // ✅ block past dates
                  onChange={(_, selectedDate) => {
                    if (selectedDate) setDate(selectedDate);
                  }}
                  style={{ flex: 1 }}
                />
              )
            ) : (
              <TouchableOpacity
                style={styles.rowButton}
                onPress={() => setActiveField("date")}
              >
                <Text style={styles.inputText}>
                  {date ? date.toLocaleDateString() : "DD/MM/YYYY"}
                </Text>
                <Ionicons name="calendar-outline" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>

          {/* Start + End Time */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {/* Start Time */}
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Start Time</Text>
              <View style={styles.inputRow}>
                {activeField === "start" ? (
                  Platform.OS === "android" ? (
                    <DateTimePicker
                      value={startTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={handleAndroidChange(
                        (d) => setStartTime(d),
                        startTime ?? new Date()
                      )}
                      {...(Platform.OS === "android"
                        ? {
                            accentColor: "#EA479A" as any,
                            positiveButtonLabel: "OK",
                            neutralButtonLabel: "Cancel",
                          }
                        : {})}
                    />
                  ) : (
                    <DateTimePicker
                      value={startTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) setStartTime(selectedDate);
                      }}
                      style={{ flex: 1 }}
                    />
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.rowButton}
                    onPress={() => setActiveField("start")}
                  >
                    <Text style={styles.inputText}>
                      {startTime
                        ? startTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "e.g. 14:00"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* End Time */}
            <View style={{ flex: 1, marginLeft: 8 }}>
              <Text style={styles.label}>End Time</Text>
              <View style={styles.inputRow}>
                {activeField === "end" ? (
                  Platform.OS === "android" ? (
                    <DateTimePicker
                      value={endTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={handleAndroidChange(
                        (d) => setEndTime(d),
                        endTime ?? new Date()
                      )}
                      {...(Platform.OS === "android"
                        ? {
                            accentColor: "#EA479A" as any,
                            positiveButtonLabel: "OK",
                            neutralButtonLabel: "Cancel",
                          }
                        : {})}
                    />
                  ) : (
                    <DateTimePicker
                      value={endTime || new Date()}
                      mode="time"
                      is24Hour={true}
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) setEndTime(selectedDate);
                      }}
                      style={{ flex: 1 }}
                    />
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.rowButton}
                    onPress={() => setActiveField("end")}
                  >
                    <Text style={styles.inputText}>
                      {endTime
                        ? endTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "e.g. 18:00"}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>

          {/* Repeat */}
          <Text style={[styles.label, { marginTop: 16 }]}>Recurring/Repeat</Text>
          <TouchableOpacity style={styles.inputRow}>
            <Text style={styles.inputText}>{repeat}</Text>
            <Ionicons name="chevron-down" size={20} color="gray" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{ marginBottom: 20, paddingHorizontal: "5%" }}>
        <StyledButton title="Next" onPress={handleSave} />
      </View>
    </EventMat>
  );
}

const styles = StyleSheet.create({
  iconCircle: {
    backgroundColor: "#e91e63",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontWeight: "500",
  },
  inputRow: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 20,
    backgroundColor: "#fafafa",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    minHeight: 48,
  },
  rowButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    fontSize: 14,
    color: "#444",
  },
});
