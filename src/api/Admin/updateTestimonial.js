import api from '../config';

export const updateTestimonial = async (id, { name, message, imageFile }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('message', message);
  if (imageFile) formData.append('image', imageFile);

  try {
    const res = await api.put(`/admin/testimonials/update/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error updating testimonial:', error.response?.data || error.message);
    throw error;
  }
};
