import api from '../../config';

// Add a new FAQ (admin endpoint)
export const addFAQ = async ({ ques, ans }) => {
  try {
    const res = await api.post('/faq/addfaq', { ques, ans });
    return res.data;
  } catch (error) {
    console.error('Error adding FAQ:', error.response?.data || error.message);
    throw error;
  }
};
