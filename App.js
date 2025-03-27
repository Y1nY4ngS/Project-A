import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthContextProvider, { AuthContext } from './context/auth-context';
import LoginScreen from './components/Auth/Loginscreen';
import RegisterScreen from './components/Auth/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import LookingForTeam from './screens/LookingForTeam';
import LookingForPlayer from './screens/LookingForPlayer';

const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  const AuthStack = createNativeStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  const AppStack = createNativeStackNavigator();
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="LookingForTeam" component={LookingForTeam} />
      <AppStack.Screen name="LookingForPlayer" component={LookingForPlayer} />
    </AppStack.Navigator>
  );
}

function Navigation() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthContextProvider>
      <Navigation />
    </AuthContextProvider>
  );
}