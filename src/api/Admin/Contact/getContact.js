import api from '../../config';

export const getContact = async () => {
  try {
    const res = await api.get('/admin/contact/getAll');
    return res.data;
  } catch (error) {
    console.error('Error fetching Contact Details:', error.response?.data || error.message);
    return [];
  }
};
