// /api/admin/faq.js
import adminApi from '../config'; // Includes auth token

// Add a new FAQ
export const addFAQ = async ({ ques, ans }) => {
  try {
    const res = await adminApi.post('/admin/faq/addfaq', { ques, ans });
    return res.data;
  } catch (error) {
    console.error('Error adding FAQ:', error.response?.data || error.message);
    throw error;
  }
};

// Update an existing FAQ
export const updateFAQ = async (id, { ques, ans }) => {
  try {
    const res = await adminApi.put(`/admin/faq/updatefaq/${id}`, { ques, ans });
    return res.data;
  } catch (error) {
    console.error('Error updating FAQ:', error.response?.data || error.message);
    throw error;
  }
};

// Delete an FAQ
export const deleteFAQ = async (id) => {
  try {
    const res = await adminApi.delete(`/admin/faq/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting FAQ:', error.response?.data || error.message);
    throw error;
  }
};
