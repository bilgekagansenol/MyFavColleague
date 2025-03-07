import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  // Örnek kullanıcı verileri
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Product Manager',
    company: 'Tech Innovations Inc.',
    profileImage: null, // Gerçek uygulamada bir resim URL'si olacak
  });
  
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: () => {
            // Gerçek uygulamada logout işlemi yapılacak
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
          style: "destructive"
        }
      ]
    );
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
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <View style={{width: 28}} />
      </LinearGradient>
      
      <ScrollView style={styles.scrollView}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            {user.profileImage ? (
              <Image 
                source={{ uri: user.profileImage }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitials}>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
            )}
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userPosition}>{user.position}</Text>
          <Text style={styles.userCompany}>{user.company}</Text>
          
          <View style={styles.userContactContainer}>
            <View style={styles.userContactItem}>
              <Ionicons name="mail-outline" size={20} color="#003366" />
              <Text style={styles.userContactText}>{user.email}</Text>
            </View>
          </View>
        </View>
        
        {/* Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={22} color="#003366" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              {/* Notifications toggle kaldırıldı */}
            </View>
          </View>
        </View>
        
        {/* Account Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <View style={styles.accountCard}>
            <TouchableOpacity 
              style={styles.accountItem}
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <View style={styles.accountInfo}>
                <Ionicons name="lock-closed-outline" size={22} color="#003366" />
                <Text style={styles.accountText}>Change Password</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6C757D" />
            </TouchableOpacity>
            
            <View style={styles.accountDivider} />
            
            <TouchableOpacity 
              style={styles.accountItem}
              onPress={() => navigation.navigate('About')}
            >
              <View style={styles.accountInfo}>
                <Ionicons name="information-circle-outline" size={22} color="#003366" />
                <Text style={styles.accountText}>About</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6C757D" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={22} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
        
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
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userPosition: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 2,
  },
  userCompany: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
  },
  userContactContainer: {
    width: '100%',
  },
  userContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userContactText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    paddingLeft: 4,
  },
  settingsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  accountCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  accountDivider: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
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

export default ProfileScreen; 