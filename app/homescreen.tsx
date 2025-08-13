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
import CalendarStrip from "../components/CalendarStrip";
import TodayEventsSection from "../components/TodayEventsSection";
import MyTasksSection from "../components/MyTasksSection";
import RemindersSection from "../components/ReminderSection";

export default function HomeScreen() {

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
          <CalendarStrip />
          <TodayEventsSection />
          <MyTasksSection />
          <RemindersSection />
        </ScrollView>
      </View>
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
    paddingBottom: '25%',
    paddingHorizontal: '6.5%',
    backgroundColor: 'transparent',
    borderRadius: 36,
  },
});
