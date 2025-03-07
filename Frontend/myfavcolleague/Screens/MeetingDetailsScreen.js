import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MeetingDetailsScreen = ({ navigation, route }) => {
  // Varsayılan olarak KEYPOINTS açık, SUMMARIZE kapalı
  const [expandedSection, setExpandedSection] = useState('keypoints');
  
  // Örnek toplantı verileri (gerçek uygulamada route.params'dan gelecek)
  const meetingData = {
    title: route.params?.title || "Weekly Team Meeting",
    date: route.params?.date || "Today",
    keypoints: [
      { id: '1', title: 'Keypoint 1', text: 'Text...', hasDate: false },
      { id: '2', title: 'Keypoint 2', text: 'Text...', hasDate: false },
      { id: '3', title: 'Keypoint 3', text: 'Text...', hasDate: false },
    ],
    summary: "This is a summary of the meeting. It includes the main points discussed and decisions made during the meeting."
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const addDate = (keypointId) => {
    // Gerçek uygulamada burada tarih ekleme işlemi yapılacak
    console.log(`Add date to keypoint ${keypointId}`);
  };

  const renderKeypoint = ({ item }) => (
    <View style={styles.keypointContainer}>
      <View style={styles.keypointHeader}>
        <View style={styles.keypointTitleContainer}>
          <Text style={styles.keypointTitle}>{item.title}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.addDateButton}
          onPress={() => addDate(item.id)}
        >
          <Text style={styles.addDateButtonText}>ADD DATE +</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.keypointContent}>
        <View style={styles.bulletPoint}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.keypointText}>{item.text}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      
      {/* Header */}
      <LinearGradient
        colors={['#003366', '#1F2937']}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>{meetingData.title}</Text>
        
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={28} color="white" />
        </TouchableOpacity>
      </LinearGradient>
      
      <View style={styles.meetingInfo}>
        <View style={styles.meetingDateContainer}>
          <Ionicons name="calendar-outline" size={18} color="#003366" />
          <Text style={styles.meetingDate}>{meetingData.date}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Summarize Section */}
        <TouchableOpacity 
          style={[
            styles.sectionHeader,
            expandedSection === 'summarize' && styles.activeSectionHeader
          ]}
          onPress={() => toggleSection('summarize')}
        >
          <Ionicons 
            name={expandedSection === 'summarize' ? 'chevron-down' : 'chevron-forward'} 
            size={24} 
            color={expandedSection === 'summarize' ? '#003366' : '#888'}
          />
          <Text style={[
            styles.sectionTitle,
            expandedSection === 'summarize' && styles.activeSectionTitle
          ]}>SUMMARIZE</Text>
        </TouchableOpacity>
        
        {expandedSection === 'summarize' && (
          <View style={styles.sectionContent}>
            <Text style={styles.summaryText}>{meetingData.summary}</Text>
          </View>
        )}
        
        {/* Keypoints Section */}
        <TouchableOpacity 
          style={[
            styles.sectionHeader,
            expandedSection === 'keypoints' && styles.activeSectionHeader
          ]}
          onPress={() => toggleSection('keypoints')}
        >
          <Ionicons 
            name={expandedSection === 'keypoints' ? 'chevron-down' : 'chevron-forward'} 
            size={24} 
            color={expandedSection === 'keypoints' ? '#003366' : '#888'}
          />
          <Text style={[
            styles.sectionTitle,
            expandedSection === 'keypoints' && styles.activeSectionTitle
          ]}>KEYPOINTS</Text>
        </TouchableOpacity>
        
        {expandedSection === 'keypoints' && (
          <View style={styles.sectionContent}>
            <FlatList
              data={meetingData.keypoints}
              renderItem={renderKeypoint}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
        
        {/* Footer Space */}
        <View style={styles.footerSpace} />
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>M</Text>
          </View>
          <Text style={styles.logoTitle}>MyFavColleague</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    padding: 4,
  },
  meetingInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  meetingDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  meetingDate: {
    fontSize: 14,
    color: '#003366',
    marginLeft: 6,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeSectionHeader: {
    borderColor: '#003366',
    borderLeftWidth: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C757D',
    marginLeft: 12,
  },
  activeSectionTitle: {
    color: '#003366',
  },
  sectionContent: {
    marginBottom: 24,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  keypointContainer: {
    borderWidth: 1,
    borderColor: '#E9ECEF',
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  keypointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  keypointTitleContainer: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 16,
  },
  keypointTitle: {
    color: 'white',
    fontWeight: '600',
  },
  addDateButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addDateButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  keypointContent: {
    padding: 16,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletDot: {
    fontSize: 18,
    marginRight: 8,
    lineHeight: 24,
    color: '#003366',
  },
  keypointText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    lineHeight: 24,
  },
  footerSpace: {
    height: 60,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoTitle: {
    color: '#003366',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MeetingDetailsScreen; 