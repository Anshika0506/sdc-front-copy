import api from '../../config';

// Update an existing FAQ (admin endpoint)
export const updateFAQ = async (id, { ques, ans }) => {
  try {
    const res = await api.put(`/faq/updatefaq/${id}`, { ques, ans });
    return res.data;
  } catch (error) {
    console.error('Error updating FAQ:', error.response?.data || error.message);
    throw error;
  }
};
