// /api/public/faq.js
import publicApi from '../axios'; // No auth token

// Fetch all FAQs (public)
export const getFAQs = async () => {
  try {
    const res = await publicApi.get('/public/allfaq'); // corrected path from image
    return res.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error.response?.data || error.message);
    throw error;
  }
};
