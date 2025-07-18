import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (value) => {
    setEmail(value);
    if (value.length > 0 && !value.includes('@gmail.com')) {
      setEmailError('Email must end with @gmail.com');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length > 0 && value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSignup = () => {
    let valid = true;

    if (!email.includes('@gmail.com')) {
      setEmailError('Email must end with @gmail.com');
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      valid = false;
    }

    if (!valid) return;

    // Clear warnings
    setEmailError('');
    setPasswordError('');

    // Success alert
    Alert.alert(
      'Success',
      'You have successfully created an account!',
      [
        {
          text: 'OK',
          onPress: () => navigation.replace('LoginScreen'), // Change to 'Login' if you want
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient colors={['#607ECF', '#607ECF']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={60}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.logoWrapper}>
            <Image source={require('./assets/CHATBOT.png')} style={styles.logo} />
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>BrgyGO</Text>
            <Text style={styles.subtitle}>
              Start a better experience by signing up your account!
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#999"
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              value={email}
              onChangeText={handleEmailChange}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {emailError ? <Text style={styles.warningText}>{emailError}</Text> : null}

            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              secureTextEntry
              value={password}
              onChangeText={handlePasswordChange}
              placeholderTextColor="#999"
            />
            {passwordError ? <Text style={styles.warningText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <Text style={styles.bottomText}>
              Already have an Account?{' '}
              <Text style={styles.link} onPress={() => navigation.replace('LoginScreen')}>
                LOG IN
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoWrapper: {
    marginBottom: -40,
    zIndex: 2,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    backgroundColor: '#fff',
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 5,
    color: '#000',
  },
  warningText: {
    width: '100%',
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    backgroundColor: '#607ECF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: 13,
    color: '#000',
  },
  link: {
    color: '#355BCF',
    fontWeight: 'bold',
  },
});
