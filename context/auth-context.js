/*
import { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    };
    loadUser();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
*/