import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const CATEGORIES = ['LFT', 'LFP'];

export default function PostFormModal({ visible, onClose, onSave, initialCategory }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState(initialCategory || 'LFT');

  const handleSave = () => {
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    const newPost = {
      title,
      text,
      category,
      createdAt: new Date().toISOString(),
    };

    onSave(newPost);
    setTitle('');
    setText('');
    setCategory(initialCategory || 'LFT');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.heading}>Create New Post</Text>

            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
            />

            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              {CATEGORIES.map((cat) => (
                <Picker.Item label={cat} value={cat} key={cat} />
              ))}
            </Picker>

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={text}
              onChangeText={setText}
              multiline
              placeholder="Write something..."
            />

            <Button title="Save Post" onPress={handleSave} />
            <View style={{ marginTop: 10 }}>
              <Button title="Cancel" color="gray" onPress={onClose} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    marginTop: 5,
    marginBottom: 10,
  },
});
