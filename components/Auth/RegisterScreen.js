import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../../constants/constants';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Alert.alert('Erfolg', 'Registrierung erfolgreich');
        navigation.navigate('Login');
      } else {
        Alert.alert('Fehler', data.message || 'Registrierung fehlgeschlagen');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Fehler', 'Server nicht erreichbar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrieren</Text>
      <TextInput placeholder="Benutzername" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Passwort" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Registrieren" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>Schon registriert? Jetzt einloggen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 12, borderRadius: 5 },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
});
