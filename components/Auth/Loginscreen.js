import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../../context/auth-context';
import { API_URL } from '../../constants/constants';
export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
        const res = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
          });
          
          const text = await res.text(); // 🔍 Rohdaten lesen
          console.log('🚨 Serverantwort:', text); // Debug-Ausgabe in DevTools
          
          try {
            const data = JSON.parse(text);
            console.log('✅ Geparstes JSON:', data);
          } catch (e) {
            console.error('❌ Kein gültiges JSON:', e);
          }

      if (res.ok) {
        login(data.user);
      } else {
        Alert.alert('Fehler', data.message || 'Login fehlgeschlagen');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Fehler', 'Server nicht erreichbar');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Benutzername oder E-Mail"
        value={identifier}
        onChangeText={setIdentifier}
        style={styles.input}
      />
      <TextInput
        placeholder="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Einloggen" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
        Noch keinen Account? Jetzt registrieren
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 12, borderRadius: 5 },
  link: { marginTop: 20, textAlign: 'center', color: 'blue' },
});
