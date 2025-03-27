import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPosts } from '../utils/postStorage';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    const all = await getPosts();
    const sorted = all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(sorted);
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
            <Text style={styles.meta}>
              {item.category} • {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 20 }}>
            <Text>No posts yet 😅</Text>
          </View>
        }
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
});
