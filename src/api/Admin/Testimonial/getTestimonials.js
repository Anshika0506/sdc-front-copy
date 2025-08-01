import { publicApi } from '../../axios'; // ✅ Use public API for testimonials

export const getTestimonials = async () => {
  try {
    console.log('📝 Fetching testimonials...');
    const res = await publicApi.get('/public/testimonies/All');
    console.log('✅ Testimonials fetched:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error.response?.data || error.message);
    console.error('🔍 Response status:', error.response?.status);
    return [];
  }
};
