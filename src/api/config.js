// /api/config.js
import axios from 'axios';

// Public API (no auth needed)
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Admin API (with token)
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("Auth Header Set:", config.headers.Authorization);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // if (status === 401 || status === 403) {
    //   console.warn("Unauthorized access - redirecting to login");
    //   // Optional: window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default adminApi;
