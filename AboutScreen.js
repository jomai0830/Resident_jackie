import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext'; // Make sure the path is correct

export default function AboutScreen({ navigation }) {
  const { isDark, colors } = useTheme();

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={colors.icon} />
      </TouchableOpacity>

      {/* Triangle Logo Layout */}
      <View style={styles.triangleLogoContainer}>
        <View style={styles.logoRowTop}>
          <Image source={require('./assets/logo1.png')} style={styles.logo} />
          <Image source={require('./assets/logo2.png')} style={styles.logo} />
        </View>
        <View style={styles.logoCenterWrapper}>
          <Image source={require('./assets/logo3.png')} style={styles.logoCenter} />
        </View>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>BrgyGo</Text>
      <Text style={[styles.description, { color: colors.label }]}>
        Developed as part of the digital transformation initiative of Brgy. Burgos,
        BrgyGo ensures that every resident stays informed, connected,
        and supported anytime, anywhere.
      </Text>

      <View style={styles.profiles}>
        <View style={styles.profileCard}>
          <View style={[styles.profilePlaceholder, { backgroundColor: isDark ? '#444' : '#D9D9D9' }]} />
          <Text style={[styles.name, { color: colors.text }]}>Leynes, Chris Michael</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={[styles.profilePlaceholder, { backgroundColor: isDark ? '#444' : '#D9D9D9' }]} />
          <Text style={[styles.name, { color: colors.text }]}>Rodriguez, Jon Mary</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={[styles.profilePlaceholder, { backgroundColor: isDark ? '#444' : '#D9D9D9' }]} />
          <Text style={[styles.name, { color: colors.text }]}>Sapotalo, Jackie Mae</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 10,
  },
  triangleLogoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logoRowTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: -10,
    gap: 10,
  },
  logoCenterWrapper: {
    marginTop: -10,
  },
  logo: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  logoCenter: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 15,
    lineHeight: 20,
  },
  profiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    gap: 25,
  },
  profileCard: {
    alignItems: 'center',
    width: 100,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    textAlign: 'center',
  },
});
