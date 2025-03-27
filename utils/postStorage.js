import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'posts';

export const savePost = async (post) => {
  const existing = await getPosts();
  const updated = [post, ...existing];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getPosts = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error reading posts:', e);
    return [];
  }
};
