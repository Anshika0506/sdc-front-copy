import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAdmin, logoutAdmin, verifyToken } from '../api/Admin/login';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Optional: verify cookie on app load
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await verifyToken(); // backend reads cookie
        setAdmin(data);
      } catch (err) {
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const login = async (email, password) => {
    const data = await loginAdmin(email, password);
    setAdmin(data); // { adminId, name, email }
  };

  const logout = async () => {
    await logoutAdmin(); // cookie cleared by backend
    setAdmin(null);
  };

  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
