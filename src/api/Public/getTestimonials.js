import publicApi from '../axios';

export const getTestimonials = async () => {
  try {
    const res = await publicApi.get('/public/testimonies/All'); 
    return res.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error.response?.data || error.message);
    return [];
  }
};