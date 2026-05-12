import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('freshmart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('freshmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('freshmart_user');
    }
  }, [user]);

  const login = (userData) => {
    // For demo purposes, we'll just store the user data
    setUser(userData);
    toast.success(`Welcome back, ${userData.name}!`);
  };

  const signup = (userData) => {
    // For demo purposes, we'll just store the user data
    setUser(userData);
    toast.success(`Account created! Welcome, ${userData.name}!`);
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
