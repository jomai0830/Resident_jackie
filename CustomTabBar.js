// CustomTabBar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.tabBarBackground }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const getIconName = () => {
          switch (route.name) {
            case 'Home': return isFocused ? 'home' : 'home-outline';
            case 'Documents': return isFocused ? 'document-text' : 'document-text-outline';
            case 'Emergency': return isFocused ? 'alert-circle' : 'alert-circle-outline';
            case 'Evacuation': return isFocused ? 'location' : 'location-outline';
            case 'Profile': return isFocused ? 'person' : 'person-outline';
            default: return 'square';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons 
              name={getIconName()} 
              size={24} 
              color={isFocused ? colors.tabIconActive : colors.tabIconInactive} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomTabBar;