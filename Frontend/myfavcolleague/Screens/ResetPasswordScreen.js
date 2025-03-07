import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  SafeAreaView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResetPasswordScreen = ({ onPasswordReset, token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Validate token on component mount
  useEffect(() => {
    // In a real app, you would validate the token with your backend
    // For demo purposes, we'll assume it's valid if it exists
    if (!token) {
      setError('Invalid or expired reset link. Please request a new one.');
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [token]);

  const handleResetPassword = () => {
    // Basic validation
    if (!password || !confirmPassword) {
      setError('Please enter and confirm your new password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    // Here we would normally send the new password to the server
    setIsResetting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResetting(false);
      
      // Show success message
      Alert.alert(
        "Password Reset Successful",
        "Your password has been reset successfully. You can now log in with your new password.",
        [
          { 
            text: "Sign In", 
            onPress: () => onPasswordReset() 
          }
        ]
      );
    }, 1500);
  };

  if (!isValid) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#003366', '#1F2937']}
          style={styles.gradient}
        >
          <View style={styles.innerContainer}>
            <View style={styles.errorContainer}>
              <Text style={styles.errorTitle}>Invalid Reset Link</Text>
              <Text style={styles.errorMessage}>
                The password reset link is invalid or has expired. Please request a new password reset link.
              </Text>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={onPasswordReset}
              >
                <Text style={styles.backButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#003366', '#1F2937']}
        style={styles.gradient}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.innerContainer}
          >
            <View style={styles.headerContainer}>
              {/* Placeholder Image */}
              <View style={styles.imageContainer}>
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderText}>LOGO</Text>
                </View>
              </View>
              
              <Text style={styles.appName}>MyFavColleague</Text>
              <Text style={styles.tagline}>Meet smarter, work better.</Text>
            </View>
            
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Create New Password</Text>
              <Text style={styles.formDescription}>
                Your password must be at least 8 characters long and include a mix of letters and numbers.
              </Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#AAAAAA"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  editable={!isResetting}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm new password"
                  placeholderTextColor="#AAAAAA"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  editable={!isResetting}
                />
              </View>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <TouchableOpacity 
                style={styles.resetButton} 
                onPress={handleResetPassword}
                activeOpacity={0.8}
                disabled={isResetting}
              >
                <Text style={styles.resetButtonText}>
                  {isResetting ? 'RESETTING...' : 'RESET PASSWORD'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backButton}
                onPress={onPasswordReset}
                disabled={isResetting}
              >
                <Text style={styles.backButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 12,
    textAlign: 'center',
  },
  formDescription: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#003366',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    color: '#333333',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  backButton: {
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#003366',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 14,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
});

export default ResetPasswordScreen; 