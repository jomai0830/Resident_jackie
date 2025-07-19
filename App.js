// App.js
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
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileHome">
        {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

function TabRoutes({ setIsLoggedIn }) {
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
      <Tab.Screen name="Profile">
        {(props) => <ProfileStack {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

function MainStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs">
        {(props) => <TabRoutes {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
    </Stack.Navigator>
  );
}

function AppDrawer({ setIsLoggedIn }) {
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
      <Drawer.Screen name="Home">
        {(props) => <MainStack {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer>
            {isLoggedIn ? <AppDrawer setIsLoggedIn={setIsLoggedIn} /> : <AuthStack setIsLoggedIn={setIsLoggedIn} />}
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
