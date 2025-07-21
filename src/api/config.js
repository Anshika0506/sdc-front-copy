import axios from 'axios';

// Public API (no auth required)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Admin API (requires JWT authentication)
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor: attach token if available
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle unauthorized/forbidden errors
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      console.warn("Unauthorized or forbidden. Clearing storage and redirecting to login.");

      // Clear all admin-related localStorage keys
      localStorage.removeItem('token');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminEmail');

      // Optional: redirect to login
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default adminApi;
