import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PostFormModal from '../components/PostFormModal';
import { getPosts, savePost } from '../utils/postStorage';

export default function LookingForTeam() {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const loadPosts = async () => {
    const all = await getPosts();
    const filtered = all.filter((p) => p.category === 'LFT');
    setPosts(filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
  };

  const handleSave = async (post) => {
    await savePost(post);
    loadPosts();
  };

  useEffect(() => {
    const unsubscribe = loadPosts();
    return () => unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.text}</Text>
            <Text style={styles.meta}>{item.category} • {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      <PostFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        initialCategory="LFT"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  meta: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabText: {
    fontSize: 30,
    color: 'white',
  },
});
