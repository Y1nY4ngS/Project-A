import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { seedFakePosts } from './utils/fakePostSeeder';
import HomeScreen from './screens/HomeScreen';
import LookingForTeam from './screens/LookingForTeam';
import LookingForPlayer from './screens/LookingForPlayer';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            seedFakePosts();

            if (route.name === 'Home') iconName = 'home-outline';
            if (route.name === 'LookingForTeam') iconName = 'people-outline';
            if (route.name === 'LookingForPlayer') iconName = 'person-add-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="LookingForTeam" component={LookingForTeam} />
        <Tab.Screen name="LookingForPlayer" component={LookingForPlayer} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
