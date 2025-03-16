import React, { useState, useRef } from 'react';
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
  Dimensions,
  Platform,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

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
    
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width * 0.8,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    Animated.timing(backgroundOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const renderMenuContent = () => {
    return (
      <View style={styles.menuContent}>
        <View style={styles.menuHeader}>
          <View style={styles.profileImageContainer}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        
        <View style={styles.menuItems}>
          {/* Profile butonu */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('Profile button pressed');
              closeMenu(); // Menüyü kapat
              navigation.navigate('Profile'); // Profile ekranına git
            }}
          >
            <Ionicons name="person-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          
          {/* Diğer menü öğeleri */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('Meetings button pressed');
              closeMenu();
              navigation.navigate('MeetingsList');
            }}
          >
            <Ionicons name="calendar-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Meetings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('About button pressed');
              closeMenu();
              navigation.navigate('About');
            }}
          >
            <Ionicons name="information-circle-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>About</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              console.log('Logout button pressed');
              closeMenu();
              // Çıkış işlemi - örneğin Login ekranına yönlendirme
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }}
          >
            <Ionicons name="log-out-outline" size={24} color="#333" />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
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
            onPress={() => {
              console.log('Profile button pressed'); // Debug için log
              navigation.navigate('Profile');
            }}
          >
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Side Menu */}
      {menuVisible && (
        <View style={styles.menuOverlay}>
          <Animated.View 
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            {renderMenuContent()}
          </Animated.View>
          
          <Animated.View 
            style={[
              styles.menuBackground,
              { opacity: backgroundOpacity }
            ]}
          >
            <TouchableOpacity 
              style={styles.menuBackgroundTouch}
              activeOpacity={1}
              onPress={closeMenu}
            />
          </Animated.View>
        </View>
      )}

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
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Upload')}
          >
            <View style={styles.actionButtonIcon}>
              <Ionicons name="mic-outline" size={24} color="#fff" />
            </View>
            <Text style={styles.actionButtonText}>Upload Recording</Text>
          </TouchableOpacity>
        </View>

        {/* Meeting Highlights Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meetings</Text>
            <TouchableOpacity 
              onPress={() => {
                console.log('See All Meetings pressed');
                navigation.navigate('MeetingsList');
              }}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* Toplantı kartları */}
          <TouchableOpacity 
            style={styles.meetingCard}
            onPress={() => navigation.navigate('MeetingDetails', { 
              meetingId: '1',
              meetingTitle: 'Weekly Team Meeting',
              meetingDate: 'Today, 10:00 AM'
            })}
          >
            <Text style={styles.meetingTitle}>Weekly Team Meeting</Text>
            <Text style={styles.meetingDate}>Today, 10:00 AM</Text>
            <Text style={styles.meetingDescription}>Discussed project timeline and assigned tasks...</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.meetingCard}
            onPress={() => navigation.navigate('MeetingDetails', { 
              meetingId: '2',
              meetingTitle: 'Product Review Meeting',
              meetingDate: 'Yesterday, 2:30 PM'
            })}
          >
            <Text style={styles.meetingTitle}>Product Review Meeting</Text>
            <Text style={styles.meetingDate}>Yesterday, 2:30 PM</Text>
            <Text style={styles.meetingDescription}>Reviewed new features and discussed user feedback...</Text>
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
  menuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    zIndex: 1000,
  },
  menuContainer: {
    width: width * 0.8,
    maxWidth: 300,
    backgroundColor: 'white',
    height: '100%',
    zIndex: 1001,
    paddingTop: Platform.OS === 'ios' ? 50 : 25,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  menuHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    backgroundColor: '#003366',
    marginTop: 0,
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
  actionButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  meetingCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  meetingDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  meetingDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
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
  menuBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  menuBackgroundTouch: {
    flex: 1,
  },
  menuContent: {
    flex: 1,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default HomeScreen; 