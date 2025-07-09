import api from '../config';

export const updateTestimonial = async (id, testimonial) => {
  try {
    const formData = new FormData();
    formData.append('clientName', testimonial.name);
    formData.append('des', testimonial.message);
    
    if (testimonial.imageFile) {
      formData.append('image', testimonial.imageFile);
    }

    const res = await api.put(`/admin/testimonials/update/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return res.data;
  } catch (error) {
    console.error('Error updating testimonial:', error.response?.data || error.message);
    throw error;
  }
};