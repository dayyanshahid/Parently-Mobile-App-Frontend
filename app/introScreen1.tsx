import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import StyledButton from '../components/StyledButton';

export default function introScreen1() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerText}>PARENTLY</Text>
        <Text style={styles.subHeaderText}>YOUR LIFE ASSISTANT</Text>

        {/* Family Title */}
        <Text style={styles.familyTitle}>⭐ Looker Family</Text>

        {/* Family Members */}
        <View style={styles.familyGrid}>
          <View style={styles.familyMember}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
              style={styles.avatar}
            />
            <Text style={styles.name}>Sarah Balmer</Text>
            <Text style={styles.role}>Mother</Text>
          </View>
          <View style={styles.familyMember}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
              style={styles.avatar}
            />
            <Text style={styles.name}>John Looker</Text>
            <Text style={styles.role}>Father</Text>
          </View>
          <View style={styles.familyMember}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
              style={styles.avatar}
            />
            <Text style={styles.name}>Harry Looker</Text>
            <Text style={styles.role}>Son</Text>
          </View>
          <View style={styles.familyMember}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
              style={styles.avatar}
            />
            <Text style={styles.name}>Eliza Looker</Text>
            <Text style={styles.role}>Daughter</Text>
          </View>
          <View style={styles.familyMember}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Replace with actual image URL
              style={styles.avatar}
            />
            <Text style={styles.name}>Georgia Looker</Text>
            <Text style={styles.role}>Daughter</Text>
          </View>
        </View>

        {/* Directory Info */}
        <View style={styles.directoryCard}>
          <Text style={styles.directoryTitle}>Parently Family Directory</Text>
          <Text style={styles.directoryText}>
            You know that you should their name..but you have no idea, and it's too late to ask. Connect faces (and parent names!) to families with the first ever parent directory.
          </Text>
          <Text style={[styles.directoryText, { fontWeight: "bold" }]}>We've got this.</Text>
          <StyledButton title="Get Started" onPress={() => {}} style={styles.nextButton} />
        </View>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  familyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 20,
  },
  familyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  familyMember: {
    alignItems: 'center',
    margin: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
  },
  role: {
    fontSize: 12,
    color: '#ccc',
  },
  directoryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    position: 'absolute',
    left:0,
    right:0,
    bottom: 0,
    padding: 20,
    borderRadius: 36,
    alignItems: 'center',
    height: "45%",
  },
  directoryTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  directoryText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 18,
  },
  nextButton: {
    borderRadius: 36,
    width: '90%',
    // bottom: 20,
    // position: 'absolute',
  },
});