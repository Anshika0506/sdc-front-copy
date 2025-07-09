import api from '../config';

export const addTestimonial = async (testimonial) => {
  try {
    const formData = new FormData();
    formData.append('clientName', testimonial.name);
    formData.append('des', testimonial.message);
    
    if (testimonial.imageFile) {
      formData.append('image', testimonial.imageFile);
    }

    const res = await api.post('/admin/testimonials/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return res.data;
  } catch (error) {
    console.error('Error adding testimonial:', error.response?.data || error.message);
    throw error;
  }
};