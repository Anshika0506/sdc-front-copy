import axios from 'axios';

const api = axios.create({
  baseURL: 'import.meta.env.VITE_API_BASE_URL', // Spring Boot backend URL
  withCredentials: true, // optional: if you're using cookies/auth
});

export default api;
