import axios from 'axios';

// ✅ Authenticated API — for routes that require JWT stored in cookies
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // ✅ Essential to send the HttpOnly cookie
});

// ✅ Public API — for routes that don’t require authentication
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: false, // ❌ No need to send cookies
});

// ✅ Optional: Provide legacy support for default imports
export default publicApi;
