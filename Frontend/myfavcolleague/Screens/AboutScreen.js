import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const AboutScreen = ({ navigation }) => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:support@myfavcolleague.com');
  };

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
        
        <Text style={styles.headerTitle}>About</Text>
        
        <View style={styles.headerRight} />
      </LinearGradient>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>M</Text>
            </View>
            <Text style={styles.appName}>MyFavColleague</Text>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Developed by</Text>
              <View style={styles.developersList}>
                <Text style={styles.developerName}>Aysima Adatepe</Text>
                <Text style={styles.developerName}>Bilge Kağan Şenol</Text>
                <Text style={styles.developerName}>Damla Radan</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Description</Text>
              <Text style={styles.descriptionText}>
                MyFavColleague is an AI-powered meeting assistant designed to enhance collaboration and efficiency in professional environments. It seamlessly transcribes, summarizes, and organizes meeting discussions, ensuring that key points and action items are captured and easily accessible.
              </Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Support</Text>
              <Text style={styles.supportText}>
                For support and inquiries, contact us at:
              </Text>
              <TouchableOpacity onPress={handleEmailPress}>
                <Text style={styles.emailLink}>support@myfavcolleague.com</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>
              © 2025 MyFavColleague. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
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
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 24,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 16,
  },
  developersList: {
    marginTop: 4,
  },
  developerName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  supportText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  emailLink: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: '500',
  },
  copyrightContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  copyrightText: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default AboutScreen; 