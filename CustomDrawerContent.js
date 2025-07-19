// CustomDrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent = ({ navigation }) => {
  const { colors, isDark, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Home', icon: 'home', screen: 'Main' },
    { name: 'Profile', icon: 'person', screen: 'Profile' },
    { name: 'Settings', icon: 'settings', screen: 'Settings' },
    { name: 'About', icon: 'information-circle', screen: 'About' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.drawerBackground }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text }]}>Menu</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Ionicons 
              name={item.icon} 
              size={24} 
              color={colors.icon} 
              style={styles.icon} 
            />
            <Text style={[styles.menuText, { color: colors.text }]}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Ionicons 
          name={isDark ? 'sunny' : 'moon'} 
          size={24} 
          color={colors.icon} 
        />
        <Text style={[styles.themeText, { color: colors.text }]}>
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  themeText: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default CustomDrawerContent;