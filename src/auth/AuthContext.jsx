import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAdmin, verifyToken, logoutAdmin } from '../api/Admin/login';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return {
      token,
      name: localStorage.getItem('adminName'),
      id: localStorage.getItem('adminId'),
      email: localStorage.getItem('adminEmail'),
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  // Optional: on mount, can re-verify token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAdmin({
        token,
        name: localStorage.getItem('adminName'),
        id: localStorage.getItem('adminId'),
        email: localStorage.getItem('adminEmail'),
      });
    } else {
      setAdmin(null);
    }
    // Optionally, verify token by calling verifyToken() here
  }, []);

  const login = async ({ token, name, adminId, email }) => {
    // This is for context-internal use, see login page for the actual API call
    localStorage.setItem('token', token);
    localStorage.setItem('adminName', name);
    localStorage.setItem('adminId', adminId);
    localStorage.setItem('adminEmail', email);

    setAdmin({ token, name, id: adminId, email });
  };

  const logout = async () => {
    await logoutAdmin();
    localStorage.removeItem('token');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminId');
    localStorage.removeItem('adminEmail');
    setAdmin(null);
  };

  const isAuthenticated = () => !!admin?.token;

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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
