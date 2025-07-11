import api from '../config';

export const postContact = async (formData) => {
  try {
    const res = await api.post('/public/contact/save', formData);
    return res.data;
  } catch (error) {
    console.error('Error submitting contact form:', error.response?.data || error.message);
    throw error;
  }
};