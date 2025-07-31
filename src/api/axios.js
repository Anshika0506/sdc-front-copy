

import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true, // This sends cookies automatically
});

// Add request interceptor for debugging
authApi.interceptors.request.use(
  (config) => {
    console.log('🔍 Making authenticated request to:', config.url);
    console.log('🍪 Cookies being sent:', document.cookie);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
authApi.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data);
    if (error.response?.status === 403) {
      console.error('🚫 403 Forbidden - Authentication failed or missing');
      console.log('🍪 Current cookies:', document.cookie);
    }
    return Promise.reject(error);
  }
);

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: false,
});

export default publicApi;
