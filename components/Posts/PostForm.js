import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../context/auth-context';
import { API_URL } from '../../constants/constants';

export default function PostForm({ category, onPostCreated }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!title || !text) {
      return Alert.alert('Fehler', 'Titel und Text dürfen nicht leer sein.');
    }

    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          text,
          category,
          user: user.username,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle('');
        setText('');
        onPostCreated && onPostCreated();
      } else {
        Alert.alert('Fehler', data.message || 'Post konnte nicht gespeichert werden.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Fehler', 'Server nicht erreichbar');
    }
  };

  return (
    <View style={styles.form}>
      <TextInput placeholder="Titel" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput
        placeholder="Text"
        value={text}
        onChangeText={setText}
        style={[styles.input, { height: 80 }]}
        multiline
      />
      <Button title="Posten" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: { margin: 16 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12 },
});
