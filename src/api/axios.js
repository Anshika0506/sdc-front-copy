// import axios from 'axios';

// const publicApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 30000,
//   withCredentials: false,
// });

// export default publicApi;
// 

import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true, // ✅ REQUIRED for cookies
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: false,
});

// ✅ fallback for default imports like: import publicApi from '...'
export default publicApi;
