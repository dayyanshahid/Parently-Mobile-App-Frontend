import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import GradientBackground from "../components/GradientBackground";
import HeaderSection from "../components/HeaderSection";
import InfoCardsSection from "../components/InfoCardsSection";
import ChildProfileSection from "../components/ChildProfileSection";
import QuickActionsSection from "../components/QuickActionsSection";
import WeatherWidget from "../components/WeatherWidget";
import CalendarStrip from "../components/CalendarStrip";
import TodayEventsSection from "../components/TodayEventsSection";
import MyTasksSection from "../components/MyTasksSection";
import RemindersSection from "../components/ReminderSection";
import BottomNavigation from "../components/BottomNavigation";

export default function HomeScreen() {
  const [selectedChild, setSelectedChild] = useState("1");

  const handleChildSelect = (childId: string) => {
    setSelectedChild(childId);
  };

  const handleQuickAction = (actionKey: string) => {
    console.log("Quick action pressed:", actionKey);
    // Handle different quick actions here
  };

  const handleWeatherPress = () => {
    console.log("Weather widget pressed");
    // Navigate to weather details or external weather app
  };

  return (
    <GradientBackground style={styles.container}>
      <View style={styles.header}>
        <HeaderSection />
        <InfoCardsSection />
      </View>
      <View style={{ flex: 1, bottom:0, paddingTop:"1%",borderRadius:36,backgroundColor: 'white',}}>
        <ScrollView 
          // overScrollMode="never"
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
          scrollToOverflowEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <ChildProfileSection onChildSelect={handleChildSelect} />
          <QuickActionsSection onActionPress={handleQuickAction} />
          <WeatherWidget onPress={handleWeatherPress} />
          <CalendarStrip />
          <TodayEventsSection />
          <MyTasksSection />
          <RemindersSection />
        </ScrollView>
      </View>
      <BottomNavigation activeTab="home" />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    bottom: 0,
  },
  header: {
    padding: '4%',
    // marginBottom: '4%',
    // backgroundColor: 'transparent',
    // borderBottomLeftRadius: 18,
    // borderBottomRightRadius: 18,
    zIndex: 1,
  },
  scrollContent: {
    // paddingTop: '2%',
    // bottom:'18%',
    // flexGrow: 1,
    paddingBottom: '30%', // Increased to account for bottom navigation
    paddingHorizontal: '6.5%',
    backgroundColor: 'transparent',
    borderRadius: 36,
  },
});
