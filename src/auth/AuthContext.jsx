import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAdmin, logoutAdmin, verifyToken } from '../api/Admin/login';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔐 Verify session on app mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await verifyToken(); // server reads JWT cookie
        setAdmin(data); // { adminId, name, email }
      } catch (err) {
        console.warn('Auth verification failed:', err.message);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  // 🔑 Call this on login form submit
  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    setAdmin(data); // server returns admin info (cookie is set by backend)
  };

  // 🚪 Logout clears cookie and context
  const logout = async () => {
    await logoutAdmin(); // server clears JWT cookie
    setAdmin(null);
  };

  // ✅ Boolean auth status
  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🧠 Hook to use context
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
