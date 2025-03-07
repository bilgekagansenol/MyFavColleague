import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
  Animated,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-width));
  const { theme, isDarkMode } = useTheme();

  const navigateToRecentAnalysis = () => {
    // Navigate to Recent Analysis screen
    if (menuVisible) {
      closeMenu();
    }
    navigation.navigate('RecentAnalysis');
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={theme.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MyFavColleague</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Menu */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={closeMenu}
          />
          
          <Animated.View 
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <View style={styles.menuHeader}>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userInitials}>JD</Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>John Doe</Text>
                  <Text style={styles.userEmail}>john.doe@example.com</Text>
                </View>
              </View>
            </View>
            
            <ScrollView style={styles.menuItems}>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="home-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Home</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="person-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Profile</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.menuItem}
                onPress={navigateToRecentAnalysis}
              >
                <Ionicons name="analytics-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Meeting Highlights</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="calendar-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Calendar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="settings-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Settings</Text>
              </TouchableOpacity>
              
              <View style={styles.menuDivider} />
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="help-circle-outline" size={24} color="#333" />
                <Text style={styles.menuItemText}>Help & Support</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>Logout</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView}>
        {/* Welcome Section */}
        <LinearGradient
          colors={['#003366', '#1F2937']}
          style={styles.welcomeSection}
        >
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.welcomeSubtext}>
              Meet smarter, work better.
            </Text>
          </View>
        </LinearGradient>

        {/* Upload Recording Section */}
        <View style={styles.uploadSection}>
          <TouchableOpacity style={styles.uploadCard}>
            <LinearGradient
              colors={['#003366', '#1F2937']}
              style={styles.uploadGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons name="cloud-upload" size={32} color="white" />
              </View>
              <Text style={styles.uploadTitle}>Upload Recording</Text>
              <Text style={styles.uploadDescription}>
                Upload your meeting recording for analysis
              </Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>UPLOAD</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Meeting Highlights Section */}
        <View style={styles.highlightsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meeting Highlights</Text>
            <TouchableOpacity onPress={navigateToRecentAnalysis}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.highlightCard}
            onPress={() => navigation.navigate('MeetingDetails', { 
              title: 'Weekly Team Meeting',
              date: 'Today'
            })}
          >
            <LinearGradient
              colors={['#003366', '#1F2937']}
              style={styles.highlightGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.highlightTitle}>Weekly Team Meeting</Text>
              <Text style={styles.highlightDate}>Today</Text>
              <View style={styles.highlightFooter}>
                <Text style={styles.highlightPoints}>5 key points</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.highlightCard}
            onPress={() => navigation.navigate('MeetingDetails', { 
              title: 'Project Review',
              date: 'Yesterday'
            })}
          >
            <LinearGradient
              colors={['#003366', '#1F2937']}
              style={styles.highlightGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.highlightTitle}>Project Review</Text>
              <Text style={styles.highlightDate}>Yesterday</Text>
              <View style={styles.highlightFooter}>
                <Text style={styles.highlightPoints}>3 key points</Text>
                <Ionicons name="arrow-forward" size={18} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="cloud-upload-outline" size={24} color="#003366" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Recording Uploaded</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="star-outline" size={24} color="#FFA500" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Analysis Favorited</Text>
              <Text style={styles.activityTime}>Yesterday</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.upcomingEventsContainer}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <View style={styles.eventCard}>
            <LinearGradient
              colors={['#003366', '#1F2937']}
              style={styles.eventGradient}
            >
              <View style={styles.eventDateContainer}>
                <Text style={styles.eventMonth}>JUN</Text>
                <Text style={styles.eventDay}>15</Text>
              </View>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>Team Meeting</Text>
                <Text style={styles.eventTime}>10:00 AM - 11:30 AM</Text>
                <View style={styles.eventAttendees}>
                  <Text style={styles.eventAttendeesText}>5 Attendees</Text>
                </View>
              </View>
            </LinearGradient>
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
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  menuButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    padding: 4,
    marginRight: 12,
  },
  profileButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: width * 0.8,
    maxWidth: 300,
    backgroundColor: 'white',
    height: '100%',
  },
  menuHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#003366',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userInitials: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 8,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeContent: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  uploadSection: {
    padding: 16,
    marginTop: 16,
  },
  uploadCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  uploadGradient: {
    padding: 24,
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  highlightsContainer: {
    padding: 16,
    marginTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#003366',
    fontWeight: '500',
  },
  highlightCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  highlightGradient: {
    padding: 16,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  highlightDate: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
  },
  highlightFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highlightPoints: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  recentActivityContainer: {
    padding: 16,
    marginTop: 8,
  },
  activityCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#6C757D',
  },
  upcomingEventsContainer: {
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  eventCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventGradient: {
    flexDirection: 'row',
    padding: 16,
  },
  eventDateContainer: {
    width: 60,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventMonth: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  eventDay: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventAttendeesText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default HomeScreen; 