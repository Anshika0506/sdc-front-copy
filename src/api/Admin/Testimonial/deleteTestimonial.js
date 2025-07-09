import api from '../../config';

export const deleteTestimonial = async (id) => {
  try {
    const res = await api.delete(`/admin/testimonials/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting testimonial:', error.response?.data || error.message);
    throw error;
  }
};
