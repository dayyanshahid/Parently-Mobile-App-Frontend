import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import InfoCardsSection from "../components/InfoCardsSection";
import CalendarStrip from "../components/CalendarStrip";
import TodayEventsSection from "../components/TodayEventsSection";
import MyTasksSection from "../components/MyTasksSection";
import RemindersSection from "../components/ReminderSection";
import BottomNavigation from "../components/BottomNavigation";
import SlidingPopup from "../components/SlidingPopup";
import { Ionicons } from "@expo/vector-icons";
import { verticalScale, spacing, responsiveDimensions, deviceInfo } from "../utils/responsive";
import { colors, typography, borderRadius } from "../utils/theme";

const KIDS = [
  "Harry Looker",
  "Georgia Looker",
  "changes height dynamically with more kids",
];
const OPTION_HEIGHT = verticalScale(55);

const RadioButton = React.memo(
  ({ label, value, selected, onSelect }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.radioButtonContainer}
      onPress={() => onSelect(value)}
    >
      <Text style={styles.radioButtonLabel}>{label}</Text>
      <View
        style={[
          styles.circle,
          selected ? styles.circleSelected : styles.circleUnselected,
        ]}
      >
        {selected && (
          <Ionicons 
            name="checkmark" 
            size={responsiveDimensions.iconSize.sm} 
            color={colors.white} 
          />
        )}
      </View>
    </TouchableOpacity>
  )
);

const PopupContent = React.memo(
  ({ kids, selectedOption, onSelect }: any) => (
    <ScrollView
      contentContainerStyle={styles.popupContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.popupTitle}>Filter by</Text>
      <RadioButton
        label="All Members"
        value="all"
        selected={selectedOption === "all"}
        onSelect={onSelect}
      />
      {kids.map((kid: string, index: number) => (
        <RadioButton
          key={index}
          label={kid}
          value={kid}
          selected={selectedOption === kid}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  )
);

export default function HomeScreen() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const handleFilterPress = useCallback(() => {
    setPopupVisible((prev) => !prev);
  }, []);

  const closePopup = useCallback(() => {
    setPopupVisible(false);
  }, []);

  const dynamicPopupHeight = useMemo(() => {
    const totalOptions = KIDS.length + 1;
    return Math.min(deviceInfo.height * 0.8, totalOptions * OPTION_HEIGHT + verticalScale(100));
  }, []);

  return (
    // FIX: Solid white wrapper to prevent ghosting during screen transitions
    <View style={styles.wrapper}>
      <GradientBackground style={styles.container}>
        <View style={styles.header}>
          <HeaderSection />
          <InfoCardsSection onFilterPress={handleFilterPress} />
        </View>

        <View style={styles.body}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <CalendarStrip />
            <TodayEventsSection
              onAddEvent={() => alert("Add pressed")}
              onSeeAll={() => alert("See all pressed")}
            />
            <MyTasksSection />
            <RemindersSection />
          </ScrollView>
        </View>

        <BottomNavigation activeTab="home" />

        <SlidingPopup
          visible={isPopupVisible}
          onClose={closePopup}
          customView={
            <PopupContent
              kids={KIDS}
              selectedOption={selectedOption}
              onSelect={setSelectedOption}
            />
          }
          popupHeight={dynamicPopupHeight}
        />
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  container: { 
    flex: 1, 
    bottom: 0 
  },
  header: { 
    paddingTop: spacing.sm, 
    paddingHorizontal: spacing.lg, 
    paddingBottom: spacing.sm, 
    zIndex: 1 
  },
  body: {
    flex: 1,
    paddingTop: spacing.xs,
    borderRadius: borderRadius.xxxl,
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: verticalScale(120), // Space for bottom navigation
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.transparent,
    borderRadius: borderRadius.xxxl,
  },
  popupContent: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    height: "100%",
  },
  popupTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bold,
    marginBottom: spacing.lg,
    color: colors.textPrimary,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
    justifyContent: "space-between",
  },
  radioButtonLabel: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.semiBold,
    fontFamily: typography.fontFamily.semiBold,
  },
  circle: {
    width: responsiveDimensions.avatarSize.sm,
    height: responsiveDimensions.avatarSize.sm,
    borderRadius: responsiveDimensions.avatarSize.sm / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  circleUnselected: {
    backgroundColor: colors.gray500,
  },
  circleSelected: {
    backgroundColor: colors.primary,
  },
});
