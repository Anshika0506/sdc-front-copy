import api from '../../config';

// Delete an FAQ (admin endpoint)
export const deleteFAQ = async (id) => {
  try {
    const res = await api.delete(`/faq/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting FAQ:', error.response?.data || error.message);
    throw error;
  }
};
