import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const ProfileDetailsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [educationalLevel, setEducationalLevel] = useState('');
  const [householdNumber, setHouseholdNumber] = useState('');
  const [sitio, setSitio] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color={colors.icon} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.profileContent}>
        {/* Avatar */}
        <View style={[styles.avatarContainer, { backgroundColor: colors.avatarBackground }]}>
          <FontAwesome name="user" size={80} color={colors.icon} />
        </View>

        {/* Profile Info */}
        <View style={[styles.profileInfo, { backgroundColor: colors.card }]}>
          {[
            { label: 'Email', value: email },
            { label: 'Full Name', value: fullName },
            { label: 'Birthday', value: birthday },
            { label: 'Phone Number', value: phoneNumber },
            { label: 'Sex', value: sex },
            { label: 'Educational Level', value: educationalLevel },
            { label: 'Household Number', value: householdNumber },
            { label: 'Sitio', value: sitio },
          ].map((item, index) => (
            <View key={index} style={styles.profileItem}>
              <Text style={[styles.label, { color: colors.label }]}>{item.label}:</Text>
              <Text style={[styles.value, { color: colors.value }]}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileInfo: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  profileItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
});
