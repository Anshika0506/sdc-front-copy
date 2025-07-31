import { authApi } from '../axios'; 


export const loginAdmin = async (email, password) => {
  try {
    console.log('🔑 Making login request to:', '/auth/login');
    const response = await authApi.post('/auth/login', {
      email,
      pass: password,
    });

    console.log('📥 Login response:', response.data);
    console.log('🍪 Login response headers:', response.headers);
    console.log('🍪 Set-Cookie header:', response.headers['set-cookie']);

    // Handle different success response formats
    const isSuccess = response.data.success === true || 
                      response.data.message === 'Login successfull' ||
                      response.data.message === 'Login successful' ||
                      response.status === 200;

    if (!isSuccess && !response.data.data) {
      throw new Error(response.data.message || 'Login failed');
    }

    // Extract admin data
    const adminData = response.data.data || response.data || { email };
    console.log('✅ Admin data extracted:', adminData);
    return adminData;

  } catch (error) {
    console.log('❌ Login error details:', error.response?.data, error.response?.status);
    
    // Handle case where backend returns success message but axios treats as error
    if (error.response?.data?.message === 'Login successfull' || 
        error.response?.data?.message === 'Login successful') {
      const adminData = error.response.data.data || error.response.data || { email };
      console.log('✅ Login successful (from catch):', adminData);
      return adminData;
    }
    
    const message = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(message);
  }
};


export const verifyToken = async () => {
  try {
    console.log('🔍 Verifying authentication token...');
    console.log('🍪 Current cookies before verification:', document.cookie);
    
    const response = await authApi.get('/auth/verify'); 
    console.log('✅ Token verification successful:', response.data);
    return response.data;
  } catch (error) {
    console.warn('❌ Token verification failed:', error.response?.status, error.response?.data);
    throw error;
  }
};


export const logoutAdmin = async () => {
  try {
    console.log('🚪 Attempting logout...');
    await authApi.post('/auth/logout');
    console.log('✅ Logout successful');
  } catch (err) {
    console.warn('Logout failed:', err);
  }
};
