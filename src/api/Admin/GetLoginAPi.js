import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminId');
      localStorage.removeItem('adminEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loginAdmin = async (email, password) => {
  try {
    console.log('🔄 Attempting login with:', { email, password: '***' });
    
    const response = await API.post('/auth/login', {
      email: email,
      pass: password,
    });

    console.log('📥 Raw response:', response);
    console.log('📦 Response data:', response.data);

    // Check if response exists
    if (!response.data) {
      throw new Error('No response data received from server');
    }

    // Handle different response structures
    // Case 1: Response has success field
    if (response.data.hasOwnProperty('success')) {
      if (response.data.success === true) {
        console.log('✅ Login successful (success: true)');
        return response.data.data || response.data;
      } else {
        console.log('❌ Login failed (success: false)');
        throw new Error(response.data.message || 'Login failed');
      }
    }
    
    // Case 2: Response has direct data with token
    else if (response.data.token) {
      console.log('✅ Login successful (direct token)');
      return response.data;
    }
    
    // Case 3: Response has nested data with token
    else if (response.data.data && response.data.data.token) {
      console.log('✅ Login successful (nested token)');
      return response.data.data;
    }
    
    // Case 4: HTTP 200 but no token - treat as error
    else {
      console.log('❌ No token in response');
      throw new Error('No authentication token received');
    }

  } catch (error) {
    console.error('🚨 Login API Error:', error);
    
    // Handle axios errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      console.log(`❌ Server error ${status}:`, data);
      
      if (data?.message) {
        throw new Error(data.message);
      } else if (data?.error) {
        throw new Error(data.error);
      } else if (status === 401) {
        throw new Error('Invalid email or password');
      } else if (status === 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`Login failed with status ${status}`);
      }
    } else if (error.request) {
      // Request made but no response received
      console.log('❌ No response received:', error.request);
      throw new Error('Unable to connect to server. Please check your internet connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
};

// Optional: Add other admin API functions
export const verifyToken = async () => {
  try {
    const response = await API.get('/auth/verify');
    return response.data;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await API.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Logout API error:', error);
    // Don't throw error for logout - always clear local storage
    return { success: true };
  }
};
