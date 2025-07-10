import api from '../../config';

export const getProject = async () => {
  try {
    const res = await api.get('/admin/project/allproject');
    return res.data;
  } catch (error) {
    console.error('Error fetching Projects:', error.response?.data || error.message);
    return [];
  }
};
