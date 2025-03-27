import React, { useEffect, useState, useContext } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import PostForm from '../components/Posts/PostForm';
import { AuthContext } from '../context/auth-context';
import { API_URL } from '../constants/constants';

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const { logout } = useContext(AuthContext);

  const loadPosts = async () => {
    const res = await fetch(`${API_URL}/api/posts`);
    const data = await res.json();
    setPosts(data.reverse()); // neueste zuerst
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PostForm category="all" onPostCreated={loadPosts} />
      <FlatList
        data={posts}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.text}</Text>
            <Text style={{ fontStyle: 'italic', color: 'gray' }}>{item.user} – {new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
