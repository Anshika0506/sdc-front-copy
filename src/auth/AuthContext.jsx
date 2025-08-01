import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, isAuthenticated, clearAuthData, getAdminData } from '../utils/cookieAuth';
import { verifyToken, loginAdmin } from '../api/Admin/login';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const checkAuthStatus = async () => {
    try {
      const hasLocalAuth = isAuthenticated();
      
      if (!hasLocalAuth) {
        setIsLoggedIn(false);
        setUser(null);
        setLoading(false);
        return;
      }
      
      const adminData = getAdminData();
      setIsLoggedIn(true);
      setUser(adminData || { authenticated: true });
      
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginAdmin(email, password);
      setIsLoggedIn(true);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggedIn(false);
      setUser(null);
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/admin/login';
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    loading,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
