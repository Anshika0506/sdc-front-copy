import api from '../axios';

export const postApplication = async (formData) => {
  try {
    const res = await api.post('/public/form/application-form', formData);
    return res.data;
  } catch (error) {
    console.error('Error submitting Application  form:', error.response?.data || error.message);
    throw error;
  }
};