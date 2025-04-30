import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const NotificationsScreen = ({ navigation }) => {
  const [notifications] = useState([
    {
      id: '1',
      title: 'Yeni Toplantı Analizi',
      message: 'Toplantı kayıtlarınız analiz edildi.',
      time: '2 saat önce',
      read: false
    },
    {
      id: '2',
      title: 'Hatırlatma',
      message: 'Yarın saat 10:00\'da toplantınız var.',
      time: '5 saat önce',
      read: true
    }
  ]);

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification
      ]}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003366" />
      
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
        
        <Text style={styles.headerTitle}>Bildirimler</Text>
        
        <View style={styles.headerRight} />
      </LinearGradient>

      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
    height: 60,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerRight: {
    width: 28,
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    backgroundColor: '#E8F0FE',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationsScreen; 