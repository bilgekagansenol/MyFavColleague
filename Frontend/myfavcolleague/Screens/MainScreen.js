import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine}></View>
            <View style={styles.menuLine}></View>
            <View style={styles.menuLine}></View>
          </View>
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.settingsIcon}>
              <View style={styles.settingsCircle}></View>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.profileIcon}>
              <View style={styles.profileCircle}></View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationPlaceholder}>
            <Text style={styles.placeholderText}>Ekip İllüstrasyonu</Text>
          </View>
        </View>
        
        {/* Title */}
        <Text style={styles.title}>Homepage</Text>
        
        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Upload Recording (Mp3)</Text>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>↑</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Meeting Highlights</Text>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>��</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>MyFavColleague</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: 'space-around',
  },
  menuLine: {
    height: 2,
    width: 24,
    backgroundColor: '#764af1',
    borderRadius: 1,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 10,
  },
  settingsIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#764af1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsCircle: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: '#764af1',
    borderRadius: 6,
  },
  profileIcon: {
    width: 24,
    height: 24,
  },
  profileCircle: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#764af1',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  illustrationPlaceholder: {
    width: '80%',
    height: '100%',
    backgroundColor: '#2C3A47',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3E4C59',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#764af1',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF',
  },
  optionsContainer: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  iconPlaceholder: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C3A47',
    borderRadius: 5,
  },
  iconText: {
    fontSize: 20,
  },
  footer: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#764af1',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
}); 