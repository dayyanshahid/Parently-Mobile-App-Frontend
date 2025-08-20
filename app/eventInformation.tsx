import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Switch } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { spacing, responsiveDimensions } from "../utils/responsive";
import { getShadow } from "../utils/platform";
import { colors, typography, borderRadius } from "../utils/theme";
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
            source={{ uri: "https://i.pravatar.cc/100?img=3" }}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.primary,
  },
  headerTitle: { 
    color: colors.white, 
    fontSize: typography.fontSize.heading3, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold
  },
  scroll: { 
    paddingBottom: spacing.xxl * 2 
  },
  imageWrapper: { 
    position: "relative" 
  },
  eventImage: { 
    width: "100%", 
    height: 200, 
    borderRadius: borderRadius.lg,
    marginTop: spacing.md 
  },
  heartButton: {
    position: "absolute", 
    top: spacing.md, 
    right: spacing.sm,
    backgroundColor: colors.white, 
    borderRadius: borderRadius.lg, 
    padding: spacing.xs,
  },
  organiserWrapper: {
    position: "absolute",
    bottom: -spacing.xl,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
    padding: spacing.sm,
    borderRadius: borderRadius.xl,
    ...getShadow('card'),
  },
  organiser: { 
    alignItems: "center", 
    marginHorizontal: spacing.sm 
  },
  avatar: { 
    width: responsiveDimensions.avatarSize.md, 
    height: responsiveDimensions.avatarSize.md, 
    borderRadius: responsiveDimensions.avatarSize.md / 2, 
    marginBottom: spacing.xs 
  },
  organiserName: { 
    fontSize: typography.fontSize.sm, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary
  },
  organiserRole: { 
    fontSize: typography.fontSize.xs, 
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular
  },
  title: {
    fontSize: typography.fontSize.heading2, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary
  },
  location: { 
    color: colors.textSecondary,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular
  },
  detailRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginVertical: spacing.sm, 
    paddingHorizontal: spacing.md 
  },
  detailTitle: { 
    fontSize: typography.fontSize.lg, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    color: colors.textPrimary
  },
  detailSubtitle: { 
    fontSize: typography.fontSize.sm, 
    color: colors.textSecondary,
    fontFamily: typography.fontFamily.regular
  },
  guestsRow: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingHorizontal: spacing.md, 
    marginTop: spacing.md,
  },
  guestAvatar: { 
    width: responsiveDimensions.avatarSize.md, 
    height: responsiveDimensions.avatarSize.md, 
    borderRadius: responsiveDimensions.avatarSize.md / 2, 
    marginRight: -spacing.sm, 
    borderWidth: 2, 
    borderColor: colors.white 
  },
  invitedText: { 
    marginLeft: spacing.xs, 
    fontSize: typography.fontSize.md, 
    color: colors.primary, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold
  },
  viewButton: {
    marginLeft: "auto", 
    backgroundColor: colors.primary, 
    borderRadius: borderRadius.lg, 
    paddingHorizontal: spacing.md, 
    paddingVertical: spacing.xs,
  },
  viewButtonText: { 
    color: colors.white, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.sm
  },
  presentCard: {
    backgroundColor: colors.white, 
    margin: spacing.md, 
    padding: spacing.md, 
    borderRadius: borderRadius.lg,
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    ...getShadow('card'),
  },
  presentIcon: { 
    fontSize: typography.fontSize.heading2 
  },
  presentTitle: { 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
    color: colors.textPrimary
  },
  presentSubtitle: { 
    color: colors.textSecondary, 
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular
  },
  inviteButton: {
    position: "absolute", 
    bottom: spacing.md, 
    left: spacing.md, 
    right: spacing.md,
    backgroundColor: colors.primary, 
    paddingVertical: spacing.md, 
    borderRadius: borderRadius.xl, 
    alignItems: "center",
    ...getShadow('button'),
  },
  inviteButtonText: { 
    color: colors.white, 
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold, 
    fontSize: typography.fontSize.lg 
  },
});
