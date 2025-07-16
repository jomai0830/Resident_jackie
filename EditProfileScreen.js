import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const EditProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [birthday, setBirthday] = useState('');
  const [education, setEducation] = useState('');
  const [household, setHousehold] = useState('');
  const [sitio, setSitio] = useState('');

  // Set header style and hide tab bar
  useLayoutEffect(() => {
    const parent = navigation.getParent(); // this gets the tab navigator

    navigation.setOptions({
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#6D84B4',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });

    if (parent) {
      parent.setOptions({ tabBarStyle: { display: 'none' } });
    }

    return () => {
      if (parent) {
        parent.setOptions({ tabBarStyle: { display: 'flex' } });
      }
    };
  }, [navigation]);

  const handleSave = () => {
    Alert.alert('Success', 'Profile saved successfully.');
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle-outline" size={100} color="#000" />
          <TouchableOpacity style={styles.editIcon}>
            <Ionicons name="pencil" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />

          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Sex</Text>
              <TextInput style={styles.input} value={sex} onChangeText={setSex} />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} />
            </View>
          </View>

          <Text style={styles.label}>Educational Level</Text>
          <TextInput style={styles.input} value={education} onChangeText={setEducation} />

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>House Hold Number</Text>
              <TextInput style={styles.input} value={household} onChangeText={setHousehold} />
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>Sitio</Text>
              <TextInput style={styles.input} value={sitio} onChangeText={setSitio} />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Saved Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f4f7fa',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 3,
  },
  formContainer: {
    backgroundColor: '#1C3A7E',
    width: '90%',
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#6D84B4',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#2CD261',
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
