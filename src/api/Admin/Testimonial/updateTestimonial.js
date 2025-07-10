import api from '../../config';

export const updateTestimonial = async (testId, { clientName, des, imageBase64 }) => {
  const formData = new FormData();
  formData.append('name', clientName);
  formData.append('message', des);
  if (imageBase64) formData.append('image', imageBase64);

  try {
    const res = await api.put(`/admin/testimonials/update/${testId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error updating testimonial:', error.response?.data || error.message);
    throw error;
  }
};
