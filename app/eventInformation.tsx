import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import EventMat from "../components/EventMat";

export default function eventInformation() {
  const router = useRouter();
  const [jointPresent, setJointPresent] = React.useState(true);

  return (
    <EventMat title="Event Information">

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Event Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: "https://placekitten.com/600/400" }}
            style={styles.eventImage}
          />
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart" size={20} color="red" />
          </TouchableOpacity>
          <View style={styles.organiserWrapper}>
            <View style={styles.organiser}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=1" }} style={styles.avatar} />
              <Text style={styles.organiserName}>Harry Looker</Text>
              <Text style={styles.organiserRole}>Host</Text>
            </View>
            <View style={styles.organiser}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=2" }} style={styles.avatar} />
              <Text style={styles.organiserName}>Sarah Balmer</Text>
              <Text style={styles.organiserRole}>Organiser</Text>
            </View>
          </View>
        </View>

        {/* Event Title */}
        <View style={{ marginTop: 48, flexDirection: "row", marginBottom: 20, justifyContent: "space-between", alignItems: "center" }}>
          {/* Left side: title + location */}
          <View>
            <Text style={styles.title}>Harry's birthday party</Text>
            <Text style={styles.location}>Riverside Park, Australia</Text>
          </View>

          {/* Right side: chat button */}
          <TouchableOpacity onPress={() => router.push("/eventGroupChat")}>
            <MaterialIcons name="chat" size={24} color="#e91e63" />
          </TouchableOpacity>
        </View>
        {/* Details */}
        <View style={styles.detailRow}>
          <MaterialIcons name="calendar-today" size={24} color="#e91e63" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.detailTitle}>Sat, January 20, 2025</Text>
            <Text style={styles.detailSubtitle}>Tuesday, 4:00PM - 9:00PM</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <MaterialIcons name="groups" size={24} color="#e91e63" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.detailTitle}>7 attending</Text>
            <Text style={styles.detailSubtitle}>of 20 invited</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location-sharp" size={24} color="#e91e63" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.detailTitle}>Funzone Play Center</Text>
            <Text style={styles.detailSubtitle}>123 Main St, City, State</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <MaterialIcons name="event-available" size={24} color="#e91e63" />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.detailTitle}>RSVP</Text>
            <Text style={styles.detailSubtitle}>20/08/2025</Text>
          </View>
        </View>

        {/* Guests */}
        <View style={styles.guestsRow}>
          <Image source={{ uri: "https://i.pravatar.cc/100?img=3" }} style={styles.guestAvatar} />
          <Image source={{ uri: "https://i.pravatar.cc/100?img=4" }} style={styles.guestAvatar} />
          <Image source={{ uri: "https://i.pravatar.cc/100?img=5" }} style={styles.guestAvatar} />
          <Text style={styles.invitedText}>+20 Invited</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
        </View>

        {/* Joint Present */}
        <View style={styles.presentCard}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.presentIcon}>🎉</Text>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.presentTitle}>Joint Present</Text>
              <Text style={styles.presentSubtitle}>
                Contribute to Harry's Birthday Gift Pool
              </Text>
            </View>
          </View>
          <Switch
            value={jointPresent}
            onValueChange={setJointPresent}
            trackColor={{ false: "#ddd", true: "#e91e63" }}
            thumbColor="#fff"
          />
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite People</Text>
      </TouchableOpacity>
    </EventMat>
  );
}

const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "linear-gradient(90deg, #6a11cb, #2575fc)",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scroll: { paddingBottom: 100 },
  imageWrapper: { position: "relative" },
  eventImage: { width: "100%", height: 200, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  heartButton: {
    position: "absolute", top: 10, right: 10,
    backgroundColor: "#fff", borderRadius: 20, padding: 6,
  },
  organiserWrapper: {
    position: "absolute",
    bottom: -30,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  organiser: { alignItems: "center", marginHorizontal: 10 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginBottom: 4 },
  organiserName: { fontSize: 12, fontWeight: "bold" },
  organiserRole: { fontSize: 11, color: "#666" },
  title: {fontSize: 20, fontWeight: "bold"},
  location: { color: "#666"},
  detailRow: { flexDirection: "row", alignItems: "center", marginVertical: 10, paddingHorizontal: 20 },
  detailTitle: { fontSize: 16, fontWeight: "bold" },
  detailSubtitle: { fontSize: 13, color: "#666" },
  guestsRow: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop: 20,
  },
  guestAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: -10, borderWidth: 2, borderColor: "#fff" },
  invitedText: { marginLeft: 12, fontSize: 14, color: "#e91e63", fontWeight: "bold" },
  viewButton: {
    marginLeft: "auto", backgroundColor: "#e91e63", borderRadius: 20, paddingHorizontal: 16, paddingVertical: 6,
  },
  viewButtonText: { color: "#fff", fontWeight: "bold" },
  presentCard: {
    backgroundColor: "#fff", margin: 20, padding: 16, borderRadius: 16,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  presentIcon: { fontSize: 24 },
  presentTitle: { fontWeight: "bold" },
  presentSubtitle: { color: "#666", fontSize: 12 },
  inviteButton: {
    position: "absolute", bottom: 20, left: 20, right: 20,
    backgroundColor: "#e91e63", paddingVertical: 14, borderRadius: 30, alignItems: "center",
  },
  inviteButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
