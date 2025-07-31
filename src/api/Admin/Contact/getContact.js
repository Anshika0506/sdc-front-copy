import { authApi } from '../../axios';

export const getContact = async () => {
  try {
    const res = await authApi.get('/admin/getAllContacts');
    return res.data;
  } catch (error) {
    console.error('Error fetching Contact Details:', error.response?.data || error.message);
    // Don't return empty array - let the error bubble up so components can handle it properly
    throw error;
  }
};
