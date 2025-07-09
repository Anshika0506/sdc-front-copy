import api from '../config';

export const addTestimonial = async ({ name, message, imageFile }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('message', message);
  if (imageFile) formData.append('image', imageFile);

  try {
    const res = await api.post('/admin/testimonials/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error adding testimonial:', error.response?.data || error.message);
    throw error;
  }
};
