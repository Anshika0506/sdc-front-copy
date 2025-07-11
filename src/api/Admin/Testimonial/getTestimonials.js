import api from '../../config';

export const getTestimonials = async () => {
  try {
    const res = await api.get('/public/testimonies/All');
    return res.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error.response?.data || error.message);
    return [];
  }
};
