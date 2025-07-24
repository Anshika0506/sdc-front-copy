import { authApi } from '../axios'; // 👈 Replaces previous adminApi

/**
 * Logs in the admin using email and password.
 * JWT cookie will be automatically set by the backend.
 */
export const loginAdmin = async (email, password) => {
  try {
    const response = await authApi.post('/auth/login', {
      email,
      pass: password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    // ✅ Successful login – extract admin data
    return response.data.data; // Contains: adminId, name, email

  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Login failed';
    throw new Error(message);
  }
};

/**
 * Verifies if the user is still authenticated (optional).
 */
export const verifyToken = async () => {
  const response = await authApi.get('/auth/verify'); // Only if you implement this endpoint
  return response.data;
};

/**
 * Logs out the admin and clears the cookie.
 */
export const logoutAdmin = async () => {
  try {
    await authApi.post('/auth/logout');
  } catch (err) {
    console.warn('Logout failed:', err);
  }
};
