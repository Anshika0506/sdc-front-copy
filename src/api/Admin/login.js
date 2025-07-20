import { adminApi } from '../config';

// LOG IN: store and return token/user info
export const loginAdmin = async (email, password) => {
  const response = await adminApi.post('/auth/login', {
    email, pass: password
  });

  // Response cases
  let token = null;
  let adminData = null;
  if (response.data.success === true) {
    adminData = response.data.data || response.data;
    token = adminData.token || adminData.accessToken;
  } else if (response.data.token) {
    adminData = response.data;
    token = response.data.token;
  } else if (response.data.data && response.data.data.token) {
    adminData = response.data.data;
    token = response.data.data.token;
  } else {
    throw new Error(response.data.message || 'Login failed (no token)');
  }

  if (!token) throw new Error('No authentication token received');

  // store in localStorage (see context for details)
  localStorage.setItem('token', token);
  localStorage.setItem('adminName', adminData.name);
  localStorage.setItem('adminId', adminData.adminId || adminData.id);
  localStorage.setItem('adminEmail', adminData.email);

  return adminData;
};

export const verifyToken = async () => {
  const response = await adminApi.get('/auth/verify');
  return response.data.user || response.data.admin || response.data.data || response.data;
};

export const logoutAdmin = async () => {
  // You may have an endpoint, but always clear localStorage
  try {
    await adminApi.post('/auth/logout');
  } catch (err) { /* ignore */ }
  localStorage.removeItem('token');
  localStorage.removeItem('adminName');
  localStorage.removeItem('adminId');
  localStorage.removeItem('adminEmail');
};
