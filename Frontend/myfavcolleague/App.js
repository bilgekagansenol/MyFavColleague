import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './Screens/MainScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import { Linking } from 'react-native';

// App Screens
import HomeScreen from './Screens/HomeScreen';
import RecentAnalysisScreen from './Screens/RecentAnalysisScreen';
import MeetingDetailsScreen from './Screens/MeetingDetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AboutScreen from './Screens/AboutScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import MeetingsList from './Screens/MeetingsList';
import MeetingDetails from './Screens/MeetingDetails';
import UploadScreen from './Screens/UploadScreen';

const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </AuthStack.Navigator>
);

const AppNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="RecentAnalysis" component={RecentAnalysisScreen} />
    <AppStack.Screen name="MeetingDetails" component={MeetingDetailsScreen} />
    <AppStack.Screen name="Profile" component={ProfileScreen} />
  </AppStack.Navigator>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login'); // 'login', 'signup', 'forgotPassword', 'resetPassword'
  const [resetToken, setResetToken] = useState(null);

  // Handle deep links
  useEffect(() => {
    // Fonksiyon tanımı
    const handleDeepLink = (event) => {
      const url = event.url;
      
      // Check if this is a password reset link
      if (url.includes('reset-password')) {
        // Extract token from URL
        // In a real app, you would parse the URL properly
        const token = url.split('token=')[1];
        if (token) {
          setResetToken(token);
          setCurrentScreen('resetPassword');
        }
      }
    };

    // React Native'in yeni sürümlerinde kullanım
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Check if app was opened with a deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        // Handle the URL
        handleDeepLink({ url });
      }
    });

    // Cleanup
    return () => {
      // Yeni sürümlerde aboneliği kaldırma
      subscription.remove();
    };
  }, []);

  const handleLogin = () => {
    // In a real app, you would register the user here
    // For now, we'll just log them in
    setCurrentScreen('home');
  };

  const handleSignup = () => {
    // In a real app, you would register the user here
    // For now, we'll just log them in
    setCurrentScreen('home');
  };

  const navigateToSignup = () => {
    setCurrentScreen('signup');
  };

  const navigateToLogin = () => {
    setCurrentScreen('login');
  };
  
  const navigateToForgotPassword = () => {
    setCurrentScreen('forgotPassword');
  };
  
  const handlePasswordReset = () => {
    // After successful password reset, go back to login
    setResetToken(null);
    setCurrentScreen('login');
  };

  // For testing purposes - simulate receiving a reset link
  const simulateResetLink = () => {
    setResetToken('sample-token-123');
    setCurrentScreen('resetPassword');
  };

  const renderAuthScreen = () => {
    switch (currentScreen) {
      case 'signup':
        return (
          <SignupScreen 
            onSignup={handleSignup} 
            onBackToLogin={navigateToLogin} 
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordScreen 
            onBackToLogin={navigateToLogin}
            // For testing only
            onSimulateResetLink={simulateResetLink}
          />
        );
      case 'resetPassword':
        return (
          <ResetPasswordScreen 
            onPasswordReset={handlePasswordReset}
            token={resetToken}
          />
        );
      case 'login':
      default:
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToSignup={navigateToSignup}
            onForgotPassword={navigateToForgotPassword}
          />
        );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MeetingsList" component={MeetingsList} />
        <Stack.Screen name="MeetingDetails" component={MeetingDetails} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
});

//deneme damlos 