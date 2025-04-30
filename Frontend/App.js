import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import HomeScreen from './Screens/HomeScreen';
import RecentAnalysisScreen from './Screens/RecentAnalysisScreen';
import MeetingDetailsScreen from './Screens/MeetingDetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AboutScreen from './Screens/AboutScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import MeetingsList from './Screens/MeetingsList';
import MeetingDetails from './Screens/MeetingDetails';
import UploadScreen from './Screens/UploadScreen';
import NotificationsScreen from './Screens/NotificationsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#F8F9FA' }
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        
        {/* Main App Screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RecentAnalysis" component={RecentAnalysisScreen} />
        <Stack.Screen name="MeetingDetails" component={MeetingDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="MeetingsList" component={MeetingsList} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
}); 