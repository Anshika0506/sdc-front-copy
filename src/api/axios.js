// import axios from 'axios';

// const publicApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 30000,
//   withCredentials: false,
// });

// export default publicApi;
// 

// import axios from 'axios';

// export const authApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 30000,
//   withCredentials: true, // 🔥 Essential for cookie-based auth
// });

// export const publicApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 30000,
//   withCredentials: false, // ❄️ No need to send cookies for public APIs
// });


import axios from 'axios';

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: false,
});

// ✅ Add default export to support older imports like: import publicApi from ...
export default publicApi;
