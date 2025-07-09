import api from '../../config';

export const deleteContact = async (id) => {
  try {
    const res = await api.delete(`/admin/contact/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting Contact Details:', error.response?.data || error.message);
    throw error;
  }
};
