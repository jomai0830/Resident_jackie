import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

export default function ChatScreen() {
  const navigation = useNavigation();
  const { isDark } = useTheme();

  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you with barangay services today?', from: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('en');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, from: 'user' }]);
    const lower = input.toLowerCase();
    let reply = language === 'en'
      ? "I'm sorry, I didn't understand that."
      : 'Paumanhin, hindi ko naintindihan.';
    if (lower.includes('clearance')) reply = language === 'en' ? 'Barangay Clearance info…' : 'Impormasyon sa clearance…';
    setTimeout(() => setMessages(prev => [...prev, { text: reply, from: 'bot' }]), 400);
    setInput('');
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'fil' : 'en'));
    const greet = language === 'en'
      ? 'Kamusta! Paano kita matutulungan?'
      : 'Hello! How can I help you?';
    setMessages([{ text: greet, from: 'bot' }]);
  };

  const styles = StyleSheet.create({
    container: { flex: 1 },
    topControls: {
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    langButton: {
      backgroundColor: isDark ? '#A2F3B2' : '#A2F3B2',
      borderRadius: 14,
      paddingVertical: 6,
      paddingHorizontal: 14,
    },
    langText: {
      fontWeight: 'bold',
      color: isDark ? '#000' : '#000',
    },
    chatArea: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: 20,
    },
    msg: {
      padding: 12,
      borderRadius: 12,
      marginVertical: 6,
      maxWidth: '80%',
    },
    bot: {
      backgroundColor: isDark ? '#2E2E2E' : '#fff',
      alignSelf: 'flex-start',
    },
    user: {
      backgroundColor: isDark ? '#30C45D' : '#D2F6D5',
      alignSelf: 'flex-end',
    },
    inputRow: {
      flexDirection: 'row',
      padding: 10,
      backgroundColor: isDark ? '#121212' : '#7A97C6',
    },
    input: {
      flex: 1,
      backgroundColor: isDark ? '#1E1E1E' : '#fff',
      color: isDark ? '#fff' : '#000',
      borderRadius: 25,
      paddingHorizontal: 15,
      marginRight: 10,
    },
    sendBtn: {
      backgroundColor: '#A2F3B2',
      borderRadius: 25,
      paddingHorizontal: 18,
      justifyContent: 'center',
    },
    sendText: {
      fontWeight: 'bold',
      color: '#000',
    },
    background: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#7A97C6',
    },
    messageText: {
      color: isDark ? '#eee' : '#000',
    },
  });

  return (
    <SafeAreaView style={styles.background}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* top language toggle button */}
        <View style={styles.topControls}>
          <TouchableOpacity onPress={toggleLanguage} style={styles.langButton}>
            <Text style={styles.langText}>{language === 'en' ? 'Filipino' : 'English'}</Text>
          </TouchableOpacity>
        </View>

        {/* chat list */}
        <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
          {messages.map((m, i) => (
            <View key={i} style={[styles.msg, m.from === 'user' ? styles.user : styles.bot]}>
              <Text style={styles.messageText}>{m.text}</Text>
            </View>
          ))}
        </ScrollView>

        {/* input bar */}
        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={language === 'en' ? 'Type a message…' : 'I-type ang mensahe…'}
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={styles.sendText}>{language === 'en' ? 'Send' : 'Ipadala'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
