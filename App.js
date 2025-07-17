import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './ThemeContext';

// Screens
import HomeScreen from './HomeScreen';
import EvacuationCenterScreen from './EvacuationCenterScreen';
import ProfileScreen from './ProfileScreen';
import DocumentsScreen from './DocumentsScreen';
import EmergencyScreen from './EmergencyScreen';
import SettingsScreen from './SettingsScreen';
import ProfileDetailsScreen from './ProfileDetailsScreen';
import EditProfileScreen from './EditProfileScreen';
import AboutScreen from './AboutScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen'; // ✅ Imported ForgotPassword screen
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Animated icon for tab bar
function AnimatedIcon({ name, color, focused }) {
  const scale = useSharedValue(focused ? 1.25 : 1);
  React.useEffect(() => {
    scale.value = withTiming(focused ? 1.25 : 1, { duration: 200 });
  }, [focused]);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  return (
    <Animated.View style={style}>
      <Ionicons name={name} size={24} color={color} />
    </Animated.View>
  );
}

// Custom bottom tab bar
function CustomTabBar({ state, navigation }) {
  const { colors } = useTheme();
  return (
    <>
      <View style={[styles.tabContainer, { backgroundColor: colors.header }]}>
        {state.routes.map((route, i) => {
          const focused = state.index === i;
          const onPress = () => navigation.navigate(route.name);
          const color = focused ? '#2CD261' : '#ccc';
          let icon = 'circle';
          if (route.name === 'Emergency') icon = 'medkit';
          else if (route.name === 'Evacuation') icon = 'business';
          else if (route.name === 'Home') icon = 'home';
          else if (route.name === 'Documents') icon = 'document-text';
          else if (route.name === 'Profile') icon = 'person';
          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabButton}>
              <AnimatedIcon name={icon} focused={focused} color={color} />
              <Text style={{ color, fontSize: 10 }}>{route.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.underlayBlack} />
    </>
  );
}

// Profile stack
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true }} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}


// Bottom tab navigation
function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Documents" component={DocumentsScreen} />
      <Tab.Screen name="Evacuation" component={EvacuationCenterScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Emergency" component={EmergencyScreen} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

// Stack inside drawer
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabRoutes} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
    </Stack.Navigator>
  );
}

// Drawer navigation
function AppDrawer() {
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: colors.header },
        drawerActiveTintColor: '#2CD261',
        drawerInactiveTintColor: colors.text,
        drawerLabelStyle: { fontSize: 14 },
      }}
    >
      <Drawer.Screen
        name="Main"
        component={MainStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

// ✅ Auth stack with Forgot Password
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        initialParams={{ setIsLoggedIn }} // ✅ Correct way to pass extra props
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

// Root App component
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            {isLoggedIn ? <AppDrawer /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0,
  },
  underlayBlack: {
    height: 8,
    backgroundColor: 'black',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 5,
  },
});
