import api from '../../axios';

export const getProject = async () => {
  try {
    const res = await api.get('/public/allproject');
    return res.data;
  } catch (error) {
    console.error('Error fetching Projects:', error.response?.data || error.message);
    return [];
  }
};
