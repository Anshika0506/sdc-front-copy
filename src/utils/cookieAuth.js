// Cookie-based authentication utilities
// Enhanced implementation with js-cookie for better persistence

import Cookies from 'js-cookie';

const AUTH_TOKEN_COOKIE = 'auth_token';
const ADMIN_DATA_COOKIE = 'admin_data';
const TOKEN_EXPIRY_HOURS = 1; // 1 hour expiry

// Cookie options for secure storage
const cookieOptions = {
  expires: 1/24, // 1 hour (1/24 of a day)
  path: '/',
  // Simplified for development - remove restrictive options
  ...(window.location.protocol === 'https:' && !window.location.hostname.includes('localhost') && {
    sameSite: 'Lax',
    secure: true
  })
};

// Store authentication data in cookies
export const storeAuthData = (adminData, token) => {
  try {
    if (token) {
      Cookies.set(AUTH_TOKEN_COOKIE, token, cookieOptions);
    }
    
    if (adminData) {
      const adminDataString = JSON.stringify(adminData);
      Cookies.set(ADMIN_DATA_COOKIE, adminDataString, cookieOptions);
    }
  } catch (error) {
    console.error('Error storing auth data:', error);
  }
};

// Get authentication token from cookie
export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_COOKIE) || null;
};

// Get admin data from cookie
export const getAdminData = () => {
  try {
    const adminDataString = Cookies.get(ADMIN_DATA_COOKIE);
    if (adminDataString) {
      return JSON.parse(adminDataString);
    }
  } catch (error) {
    console.error('Error parsing admin data from cookie:', error);
  }
  return null;
};

// Check if user is authenticated (has valid token)
export const isAuthenticated = () => {
  const token = getAuthToken();
  const adminData = getAdminData();
  return !!(token && adminData);
};

// Clear all authentication data
export const clearAuthData = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE, { path: '/' });
  Cookies.remove(ADMIN_DATA_COOKIE, { path: '/' });
};

// Check if cookies are about to expire (within 5 minutes)
export const isTokenExpiringSoon = () => {
  // Since we can't easily check cookie expiration from JavaScript,
  // we'll rely on server responses to determine if token is expired
  return false;
};
