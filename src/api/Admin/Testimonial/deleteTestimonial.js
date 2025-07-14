import api from '../../config';

export const deleteTestimonial = async (testId) => {
  try {
    const res = await api.delete(`/admin/testimonials/delete/${testId}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting testimonial:', error.response?.data || error.message);
    throw error;
  }
};

