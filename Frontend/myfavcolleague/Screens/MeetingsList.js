import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommonHeader from '../components/CommonHeader';

const MeetingsList = () => {
  const navigation = useNavigation();
  
  // Örnek toplantı verileri
  const meetings = [
    { id: '1', title: 'Weekly Team Meeting', date: 'Today, 10:00 AM', description: 'Discussed project timeline and assigned tasks...' },
    { id: '2', title: 'Product Review Meeting', date: 'Yesterday, 2:30 PM', description: 'Reviewed new features and discussed user feedback...' },
    { id: '3', title: 'Client Presentation', date: '12 May, 11:00 AM', description: 'Presented project progress to the client...' },
    { id: '4', title: 'Sprint Planning', date: '10 May, 9:00 AM', description: 'Planned tasks for the upcoming sprint...' },
    { id: '5', title: 'Design Review', date: '8 May, 3:00 PM', description: 'Reviewed UI/UX designs for the new features...' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Ortak Header */}
      <CommonHeader title="All Meetings" showBackButton={true} />

      {/* Meetings List */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.meetingsContainer}>
          {meetings.map(meeting => (
            <TouchableOpacity
              key={meeting.id}
              style={styles.meetingCard}
              onPress={() => navigation.navigate('MeetingDetails', { 
                meetingId: meeting.id,
                meetingTitle: meeting.title,
                meetingDate: meeting.date
              })}
            >
              <Text style={styles.meetingTitle}>{meeting.title}</Text>
              <Text style={styles.meetingDate}>{meeting.date}</Text>
              <Text style={styles.meetingDescription}>{meeting.description}</Text>
            </TouchableOpacity>
          ))}
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
  meetingsContainer: {
    padding: 15,
  },
  meetingCard: {
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  meetingDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  meetingDescription: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
});

export default MeetingsList; 