import React, { useState } from 'react';
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

const ForgotPasswordScreen = ({ onBackToLogin, onSimulateResetLink }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here we would normally send a reset password email
    // For now, we'll just simulate it
    setError('');
    setIsSent(true);
    
    // In a real app, you would call an API here
    // For demo purposes, we'll just show a success message
    Alert.alert(
      "Reset Email Sent",
      "If an account exists with this email, you will receive password reset instructions.",
      [{ text: "OK" }]
    );
  };

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
              <Text style={styles.formTitle}>Reset Password</Text>
              <Text style={styles.formDescription}>
                Enter your email address and we'll send you instructions to reset your password.
              </Text>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  placeholderTextColor="#AAAAAA"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!isSent}
                />
              </View>
              
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              
              <TouchableOpacity 
                style={[
                  styles.resetButton,
                  isSent && styles.resetButtonSent
                ]} 
                onPress={handleResetPassword}
                activeOpacity={0.8}
                disabled={isSent}
              >
                <Text style={styles.resetButtonText}>
                  {isSent ? 'EMAIL SENT' : 'SEND RESET LINK'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.backButton}
                onPress={onBackToLogin}
              >
                <Text style={styles.backButtonText}>Back to Sign In</Text>
              </TouchableOpacity>
              
              {/* For testing only - remove in production */}
              <TouchableOpacity 
                style={styles.testButton}
                onPress={onSimulateResetLink}
              >
                <Text style={styles.testButtonText}>Simulate Reset Link</Text>
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
  resetButtonSent: {
    backgroundColor: '#28A745',
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
  testButton: {
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginHorizontal: 40,
    marginTop: 20,
  },
  testButtonText: {
    color: '#6C757D',
    fontSize: 12,
  },
});

export default ForgotPasswordScreen; 