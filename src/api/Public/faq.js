// /api/public/faq.js
import { publicApi } from '../axios'; // ✅ Fixed: named import

// Fetch all FAQs (public)
export const getFAQs = async () => {
  try {
    console.log('❓ Fetching FAQs...');
    const res = await publicApi.get('/public/allfaq');
    console.log('✅ FAQs fetched:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching FAQs:', error.response?.data || error.message);
    console.error('🔍 Response status:', error.response?.status);
    throw error;
  }
};
