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
  Image,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useActions } from '../context/ActionsContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { actions, toggleAction } = useActions();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;
  const [newAction, setNewAction] = useState('');
  const [newActionDeadline, setNewActionDeadline] = useState('');

  // Örnek key point verileri
  const [keyPoints, setKeyPoints] = useState([
    {
      id: 1,
      meeting: 'Weekly Team Meeting',
      point: 'Team agreed on the new project timeline',
      responsible: 'Damla',
      date: 'Today, 10:00 AM',
      meetingId: '1'
    },
    {
      id: 2,
      meeting: 'Product Review Meeting',
      point: 'Next sprint planning scheduled for next Monday',
      responsible: 'Damla',
      date: 'Yesterday, 2:30 PM',
      meetingId: '2'
    },
    {
      id: 3,
      meeting: 'Client Presentation',
      point: 'Client demo planned for the end of the month',
      responsible: 'Ahmet',
      date: '12 May, 11:00 AM',
      meetingId: '3'
    }
  ]);

  // Toplantı isimlerini Türkçeleştirme fonksiyonu
  const getMeetingTitle = (meeting) => {
    const meetingTitles = {
      'Weekly Team Meeting': 'Haftalık Ekip Toplantısı',
      'Product Review Meeting': 'Ürün İnceleme Toplantısı',
      'Client Presentation': 'Müşteri Sunumu',
      'Sprint Planning': 'Sprint Planlama',
      'Design Review': 'Tasarım İnceleme'
    };
    return meetingTitles[meeting] || meeting;
  };

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
          <Text style={styles.profileName}>Damla Radan</Text>
          <Text style={styles.profileEmail}>Product Owner</Text>
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

  const navigateToMeeting = (meetingId) => {
    navigation.navigate('MeetingDetails', {
      meetingId: meetingId,
      meetingTitle: keyPoints.find(point => point.meetingId === meetingId)?.meeting,
      meetingDate: keyPoints.find(point => point.meetingId === meetingId)?.date
    });
  };

  const renderKeyPoints = () => {
    return keyPoints.map((point) => (
      <TouchableOpacity 
        style={styles.todoItem} 
        key={point.id}
        onPress={() => navigateToMeeting(point.meetingId)}
      >
        <View style={styles.todoIconContainer}>
          <Ionicons name="checkmark-circle-outline" size={24} color="#003366" />
        </View>
        <View style={styles.todoContent}>
          <View style={styles.todoHeader}>
            <Text style={styles.todoTitle}>{point.point}</Text>
            <View style={[
              styles.responsibleBadge,
              point.responsible === 'Damla' && styles.myResponsibleBadge
            ]}>
              <Text style={styles.responsibleText}>Responsible: {point.responsible}</Text>
            </View>
          </View>
          <View style={styles.todoFooter}>
            <Text style={styles.todoMeeting}>{point.meeting}</Text>
            <Text style={styles.todoDate}>{point.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  const addNewAction = () => {
    if (newAction.trim() && newActionDeadline.trim()) {
      const newActionItem = {
        id: Date.now(),
        title: newAction,
        deadline: newActionDeadline,
        completed: false
      };
      setActions([...actions, newActionItem]);
      setNewAction('');
      setNewActionDeadline('');
    }
  };

  const navigateToMeetingActions = () => {
    navigation.navigate('MeetingActions', { actions });
  };

  const renderActions = () => {
    return actions.map((action) => (
      <View key={action.id} style={styles.todoItem}>
        <TouchableOpacity 
          style={styles.todoIconContainer}
          onPress={() => toggleAction(action.id)}
        >
          <Ionicons 
            name={action.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
            size={24} 
            color={action.completed ? "#003366" : "#666"} 
          />
        </TouchableOpacity>
        <View style={styles.todoContent}>
          <Text style={[
            styles.todoTitle,
            action.completed && styles.completedText
          ]}>
            {action.title}
          </Text>
          <Text style={styles.todoDate}>{action.deadline}</Text>
        </View>
      </View>
    ));
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
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => {
              console.log('Profile button pressed');
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
            <Text style={styles.userName}>Damla Radan</Text>
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

        {/* Meeting Tasks Section */}
        <View style={styles.todoContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Meeting Tasks</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('MeetingActions')}
            >
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.todoCard}>
            {actions.slice(0, 3).map((action) => (
              <View key={action.id} style={styles.todoItem}>
                <TouchableOpacity 
                  style={styles.todoIconContainer}
                  onPress={() => toggleAction(action.id)}
                >
                  <Ionicons 
                    name={action.completed ? "checkmark-circle" : "checkmark-circle-outline"} 
                    size={24} 
                    color={action.completed ? "#003366" : "#666"} 
                  />
                </TouchableOpacity>
                <View style={styles.todoContent}>
                  <Text style={[
                    styles.todoTitle,
                    action.completed && styles.completedText
                  ]}>
                    {action.title}
                  </Text>
                  <Text style={styles.todoDate}>{action.deadline}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer Space */}
        <View style={styles.footerSpace} />
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
  todoContainer: {
    padding: 16,
    marginTop: 8,
  },
  todoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  todoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 4,
  },
  todoContent: {
    flex: 1,
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  todoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  responsibleBadge: {
    backgroundColor: '#E6F3FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  responsibleText: {
    fontSize: 12,
    color: '#003366',
    fontWeight: '500',
  },
  todoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoMeeting: {
    fontSize: 12,
    color: '#6C757D',
  },
  todoDate: {
    fontSize: 11,
    color: '#6C757D',
  },
  footerSpace: {
    height: 24,
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
  myResponsibleBadge: {
    backgroundColor: '#D1E7FF',
    borderColor: '#003366',
    borderWidth: 1,
  },
  addActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 14,
  },
  addButton: {
    padding: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#666',
  },
});

export default HomeScreen; 