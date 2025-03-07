import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const RecentAnalysisScreen = ({ navigation }) => {
  // Sample data for analyses
  const [analyses, setAnalyses] = useState([
    { id: '1', title: 'Analysis 1', date: 'YY/MM/DD', favorite: true },
    { id: '2', title: 'Analysis 2', date: 'YY/MM/DD', favorite: false },
    { id: '3', title: 'Analysis 3', date: 'YY/MM/DD', favorite: false },
    { id: '4', title: 'Analysis 4', date: 'YY/MM/DD', favorite: false },
  ]);

  const toggleFavorite = (id) => {
    setAnalyses(
      analyses.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const deleteAnalysis = (id) => {
    setAnalyses(analyses.filter(item => item.id !== id));
  };

  const renderAnalysisItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.analysisItem}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('MeetingDetails', { 
        title: item.title,
        date: item.date
      })}
    >
      <LinearGradient
        colors={['#003366', '#1F2937']}
        style={styles.gradientCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.cardContent}>
          <Text style={styles.analysisTitle}>{item.title}</Text>
          <View style={styles.cardActions}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => toggleFavorite(item.id)}
              >
                <Ionicons 
                  name={item.favorite ? "star" : "star-outline"} 
                  size={22} 
                  color={item.favorite ? "#FFA500" : "#FFF"} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={() => deleteAnalysis(item.id)}
              >
                <Ionicons name="trash-outline" size={22} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RECENT ANALYSIS</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={analyses}
        renderItem={renderAnalysisItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.footer}>
        <View style={styles.footerBackground} />
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
  settingsButton: {
    padding: 4,
    marginRight: 12,
  },
  profileButton: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
  },
  analysisItem: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradientCard: {
    borderRadius: 16,
  },
  cardContent: {
    padding: 16,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  footer: {
    position: 'relative',
    height: 200,
    width: '100%',
  },
  footerBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8EAF6',
    opacity: 0.5,
  },
  logoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoTitle: {
    color: '#003366',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecentAnalysisScreen; 