import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('freshmart_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('freshmart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('freshmart_user');
    }
  }, [user]);

  const login = async (email, password) => {
    setLoading(true);
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: '1',
          name: 'John Doe',
          email: email,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
          location: 'Hyderabad, Jubilee Hills'
        };
        setUser(userData);
        setLoading(false);
        toast.success('Login Successful! Welcome back.');
        resolve(userData);
      }, 1000);
    });
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          name: name,
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
          location: 'Hyderabad, India'
        };
        setUser(userData);
        setLoading(false);
        toast.success('Account created successfully!');
        resolve(userData);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
