import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, Modal, TouchableWithoutFeedback, ScrollView, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 60 : 60 + StatusBar.currentHeight;

const CommonHeader = ({ 
  title, 
  showBackButton = true,
  gradientColors = ['#003366', '#003366', '#003366'],
  headerHeight = HEADER_HEIGHT
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.8)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width * 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <>
      <LinearGradient
        colors={gradientColors}
        style={[styles.header, { height: headerHeight }]}
      >
        <View style={styles.leftContainer}>
          {showBackButton ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="#fff" />
            </TouchableOpacity>
          ) : null}
          
          <TouchableOpacity
            style={styles.menuButton}
            onPress={openMenu}
          >
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerTitle}>{title}</Text>
        
        <View style={styles.rightPlaceholder} />
      </LinearGradient>

      {/* Yan Menü */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.menuOverlay}>
          <Animated.View
            style={[
              styles.menuBackground,
              { opacity: backgroundOpacity }
            ]}
          >
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.menuBackgroundTouch} />
            </TouchableWithoutFeedback>
          </Animated.View>
          
          <Animated.View
            style={[
              styles.menuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <ScrollView>
              <View style={styles.menuHeader}>
                <View style={styles.profileImageContainer}>
                  <Ionicons name="person" size={40} color="#666" />
                </View>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.profileEmail}>john.doe@example.com</Text>
              </View>
              
              <View style={styles.menuItems}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    closeMenu();
                    navigation.navigate('Home');
                  }}
                >
                  <Ionicons name="home-outline" size={24} color="#333" />
                  <Text style={styles.menuItemText}>Home</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    closeMenu();
                    navigation.navigate('Profile');
                  }}
                >
                  <Ionicons name="person-outline" size={24} color="#333" />
                  <Text style={styles.menuItemText}>Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
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
                    closeMenu();
                    navigation.navigate('Upload');
                  }}
                >
                  <Ionicons name="mic-outline" size={24} color="#333" />
                  <Text style={styles.menuItemText}>Upload Recording</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => {
                    closeMenu();
                    // Çıkış işlemi
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
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
    opacity: 0.9,
  },
  menuButton: {
    padding: 8,
    opacity: 0.9,
  },
  menuContainer: {
    width: width * 0.8,
    maxWidth: 300,
    backgroundColor: '#fff',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: '#003366',
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 0.3,
  },
  menuItems: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  menuItemText: {
    fontSize: 15,
    color: '#6C757D',
    marginLeft: 16,
    letterSpacing: 0.3,
  },
  menuBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  menuBackgroundTouch: {
    flex: 1,
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  rightPlaceholder: {
    width: 34,
  },
});

export default CommonHeader; 