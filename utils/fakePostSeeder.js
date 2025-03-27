import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'posts';

const randomText = [
  'Looking for a chill team to play with!',
  'Ready to compete at high level.',
  'Need teammates for weekend sessions.',
  'I’m available evenings and weekends!',
  'Let’s build a squad together!',
];

const generateFakePosts = () => {
  const posts = [];

  for (let i = 0; i < 30; i++) {
    const category = Math.random() < 0.5 ? 'LFT' : 'LFP';
    const title = category === 'LFT' ? 'Looking for Team' : 'Looking for Player';
    const text = randomText[Math.floor(Math.random() * randomText.length)];

    posts.push({
      title: `${title} #${i + 1}`,
      text,
      category,
      createdAt: new Date(Date.now() - i * 60000).toISOString(), // space out timestamps
    });
  }

  return posts;
};

export const seedFakePosts = async () => {
  const existing = await AsyncStorage.getItem(STORAGE_KEY);
  if (!existing) {
    const posts = generateFakePosts();
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    console.log('✅ Fake posts seeded');
  } else {
    console.log('🟡 Posts already exist, skipping seed');
  }
};
