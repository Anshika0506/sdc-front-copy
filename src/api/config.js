import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:9015',
  timeout: 10000,
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage, sessionStorage, or wherever you store it
    const token = localStorage.getItem('authToken') || 
                  sessionStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      
      // Redirect to login or show login modal
      window.location.href = '/login'; // Adjust based on your routing
    }
    return Promise.reject(error);
  }
);

export default api;