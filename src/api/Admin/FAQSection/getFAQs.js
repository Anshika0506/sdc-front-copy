import api from '../../config';

// Fetch all FAQs (public endpoint)
export const getFAQs = async () => {
  try {
    const res = await api.get('/faq/allfaq');
    return res.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error.response?.data || error.message);
    throw error;
  }
};
