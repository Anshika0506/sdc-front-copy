import axios from 'axios';

// For public (no-auth) API
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// For admin - need to send JWT from localStorage
export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// Attach JWT token to every request if present
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Unauthorized, clear tokens
      localStorage.removeItem('token');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminEmail');
      // Optionally, force reload/redirect to login:
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default adminApi;
