import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9015',
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || 
                  sessionStorage.getItem('authToken') || 
                  localStorage.getItem('token') || 
                  sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // Optional: Prevent redirect during test/dev phase
      console.warn("Unauthorized access - redirecting to login");

      // Comment the redirect below if you don’t want forced login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
