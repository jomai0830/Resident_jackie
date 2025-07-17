import React from 'react';
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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation, route }) {
  const { setIsLoggedIn } = route.params;

  const handleLogin = () => {
    // Just set login to true regardless of input (since we're removing validation)
    setIsLoggedIn(true);
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
            <Text style={styles.subtitle}>Start a better experience by logging into your account!</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your Password"
                secureTextEntry={true}
                placeholderTextColor="#999"
              />
              <TouchableOpacity>
                <Ionicons name="eye-off-outline" size={22} color="#999" />
              </TouchableOpacity>
            </View>

            <View style={{ width: '100%' }}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end' }}>
                <Text style={styles.forgot}>Forgot your Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableOpacity>

            <Text style={styles.bottomText}>
              Don’t have an Account?{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                CREATE ACCOUNT
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
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logoWrapper: {
    marginBottom: -20,
    zIndex: 2,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 70,
    resizeMode: 'contain',
    backgroundColor: '#fff',
    marginBottom: -30,
  },
  card: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    paddingTop: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 6,
    marginTop: 5,
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
    marginBottom: 10,
    color: '#000',
  },
  passwordWrapper: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#000',
  },
  forgot: {
    color: 'red',
    fontSize: 10,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: '100%',
    backgroundColor: '#607ECF',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomText: {
    fontSize: 11,
    color: '#000',
  },
  link: {
    color: '#355BCF',
    fontWeight: 'bold',
    fontSize: 11,
  },
});
