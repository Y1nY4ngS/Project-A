import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { API_URL } from '../../constants/constants';

export default function FilteredPosts({ category }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API_URL}/api/posts?category=${category}`);
      const data = await res.json();
      setPosts(data.reverse());
    };
    load();
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item, idx) => idx.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
          <Text>{item.text}</Text>
          <Text style={{ fontStyle: 'italic', color: 'gray' }}>{item.user}</Text>
        </View>
      )}
    />
  );
}
