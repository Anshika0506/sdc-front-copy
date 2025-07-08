import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      return {
        token,
        name: localStorage.getItem('adminName'),
        id: localStorage.getItem('adminId'),
        email: localStorage.getItem('adminEmail')
      };
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      setAdmin({
        token,
        name: localStorage.getItem('adminName'),
        id: localStorage.getItem('adminId'),
        email: localStorage.getItem('adminEmail')
      });
    }
    setIsLoading(false);
  }, []);

  const login = (data) => {
    const { token, name, adminId, email } = data;
    
    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('adminName', name);
    localStorage.setItem('adminId', adminId);
    localStorage.setItem('adminEmail', email);
    
    // Set in context
    setAdmin({
      token,
      name,
      id: adminId,
      email
    });
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    
    // Clear context
    setAdmin(null);
  };

  const isAuthenticated = () => {
    return !!admin?.token;
  };

  return (
    <AuthContext.Provider value={{ 
      admin, 
      login, 
      logout, 
      isAuthenticated: isAuthenticated(),
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};