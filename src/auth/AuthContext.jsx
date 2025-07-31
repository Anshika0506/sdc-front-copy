import React, { createContext, useState, useEffect, useContext } from 'react';
import { loginAdmin, logoutAdmin, verifyToken } from '../api/Admin/login';
import { checkSessionHealth, hasAuthCookie, REFRESH_INTERVAL } from '../utils/sessionUtils';
import { 
  storeTemporarySession, 
  getTemporarySession, 
  clearTemporarySession,
  extendTemporarySession,
  isSessionCloseToExpiry 
} from '../utils/temporarySession';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastAuthCheck, setLastAuthCheck] = useState(null);

  // 🔐 Verify session on app mount and periodically
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        console.log('🔍 Verifying authentication session...');
        checkSessionHealth(); // Debug cookie status
        
        // First, try to get temporary session (workaround for missing cookies)
        const tempSession = getTemporarySession();
        if (tempSession) {
          console.log('📱 Found valid temporary session:', tempSession);
          setAdmin(tempSession);
          setLastAuthCheck(new Date());
          setIsLoading(false);
          return;
        }
        
        // Check if auth cookie exists before making request
        if (!hasAuthCookie()) {
          console.log('⚠️ No authentication cookie found, skipping verification');
          setAdmin(null);
          setLastAuthCheck(null);
          setIsLoading(false);
          return;
        }

        const data = await verifyToken(); // server reads JWT cookie
        console.log('✅ Session verified:', data);
        setAdmin(data); // { adminId, name, email }
        setLastAuthCheck(new Date());
      } catch (err) {
        console.warn('❌ Auth verification failed:', err.message);
        setAdmin(null);
        setLastAuthCheck(null);
        clearTemporarySession(); // Clear any invalid temporary session
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmin();

    // Set up periodic auth check every 5 minutes to refresh session
    const authInterval = setInterval(() => {
      if (admin) {
        // Check if temporary session needs extension
        if (isSessionCloseToExpiry()) {
          console.log('🔄 Session close to expiry, extending...');
          extendTemporarySession();
        }
        
        if (hasAuthCookie()) {
          console.log('🔄 Periodic auth check...');
          fetchAdmin();
        } else {
          console.log('🔄 No cookies, but checking temporary session...');
          const tempSession = getTemporarySession();
          if (!tempSession) {
            console.log('⚠️ No valid session found, logging out');
            logout();
          }
        }
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(authInterval);
  }, [admin?.adminId]); // Re-run if admin changes

  // 🔑 Call this on login form submit
  const login = async (email, password) => {
    try {
      console.log('🔑 Attempting login for:', email);
      const data = await loginAdmin(email, password);
      console.log('✅ Login successful:', data);
      
      // Store temporary session as workaround for missing cookies
      storeTemporarySession(data);
      
      // Verify the authentication cookie was set
      setTimeout(() => {
        checkSessionHealth();
        if (!hasAuthCookie()) {
          console.warn('⚠️ Login successful but no authentication cookie detected!');
          console.warn('Using temporary session storage as workaround.');
          console.warn('⚠️ BACKEND ISSUE: Backend should set HTTP-only cookies on login.');
        } else {
          console.log('✅ Authentication cookie successfully set');
        }
      }, 100); // Small delay to allow cookie to be set

      setAdmin(data); // server returns admin info (cookie is set by backend)
      setLastAuthCheck(new Date());
      return data; // Return data for component to handle navigation
    } catch (error) {
      console.error('❌ Login failed:', error.message);
      clearTemporarySession(); // Clear any temporary session on login failure
      throw error; // Re-throw to be handled by the component
    }
  };

  // 🚪 Logout clears cookie and context
  const logout = async () => {
    try {
      await logoutAdmin(); // server clears JWT cookie
      setAdmin(null);
      setLastAuthCheck(null);
      clearTemporarySession(); // Clear temporary session
      console.log('🚪 Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if logout request fails
      setAdmin(null);
      setLastAuthCheck(null);
      clearTemporarySession(); // Clear temporary session
    }
  };

  // 🔄 Refresh authentication manually
  const refreshAuth = async () => {
    if (!admin) return false;
    
    try {
      console.log('🔄 Refreshing authentication...');
      const data = await verifyToken();
      setAdmin(data);
      setLastAuthCheck(new Date());
      console.log('✅ Auth refreshed successfully');
      return true;
    } catch (error) {
      console.warn('Auth refresh failed:', error.message);
      setAdmin(null);
      setLastAuthCheck(null);
      return false;
    }
  };

  // ✅ Boolean auth status
  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider value={{ 
      admin, 
      login, 
      logout, 
      refreshAuth,
      isAuthenticated, 
      isLoading,
      lastAuthCheck 
    }}>
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
