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

   

    // Check if response exists
    if (!response.data) {
      throw new Error('No response data received from server');
    }

    // Handle different response structures
    let token = null;
    let adminData = null;
    // Case 1: Response has success field
    if (response.data.hasOwnProperty('success')) {
      if (response.data.success === true) {
        adminData = response.data.data || response.data;
        token = adminData.token || adminData.accessToken || null;
      } else {
       
        throw new Error(response.data.message || 'Login failed');
      }
    }
    // Case 2: Response has direct data with token
    else if (response.data.token) {
      adminData = response.data;
      token = response.data.token;
    }
    // Case 3: Response has nested data with token
    else if (response.data.data && response.data.data.token) {
      adminData = response.data.data;
      token = response.data.data.token;
    }
    // Case 4: HTTP 200 but no token - treat as error
    else {
     
      throw new Error('No authentication token received');
    }

    // Store token in both 'token' and 'authToken' for compatibility
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('authToken', token);
    }
    return adminData;

  } catch (error) {
  
    
    // Handle axios errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      
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
 
    // Don't throw error for logout - always clear local storage
    return { success: true };
  }
};
