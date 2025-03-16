import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CommonHeader from '../components/CommonHeader';

const MeetingDetails = ({ route }) => {
  // route.params'dan toplantı bilgilerini alalım
  const { meetingId, meetingTitle, meetingDate } = route.params || {};
  
  // Örnek toplantı detayları
  const keyPoints = [
    'Team agreed on the new project timeline',
    'John will handle the frontend development',
    'Sarah will focus on backend API integration',
    'Next sprint planning scheduled for next Monday',
    'Client demo planned for the end of the month'
  ];
  
  const summary = "During this meeting, we discussed the current project status and agreed on the next steps. The team identified several challenges with the current implementation and proposed solutions. We also reviewed the client feedback and made adjustments to our roadmap accordingly. Everyone is clear on their responsibilities and deadlines.";

  return (
    <SafeAreaView style={styles.container}>
      {/* Ortak Header */}
      <CommonHeader title="Meeting Details" showBackButton={true} />

      {/* Meeting Details */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          {/* Meeting Info */}
          <View style={styles.meetingInfoCard}>
            <Text style={styles.meetingTitle}>{meetingTitle || 'Meeting Title'}</Text>
            <Text style={styles.meetingDate}>{meetingDate || 'Meeting Date'}</Text>
          </View>
          
          {/* Summary */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
          
          {/* Key Points */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Key Points</Text>
            {keyPoints.map((point, index) => (
              <View key={index} style={styles.keyPointItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.keyPointText}>{point}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  meetingInfoCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  meetingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetingDate: {
    fontSize: 14,
    color: '#666',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b5998',
    marginTop: 7,
    marginRight: 10,
  },
  keyPointText: {
    flex: 1,
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});

export default MeetingDetails; 