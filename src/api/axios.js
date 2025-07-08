import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9015', // Spring Boot backend URL
  withCredentials: true, // optional: if you're using cookies/auth
});

export default api;
