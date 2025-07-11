import api from '../config';

export const getAlumini = async () => {
  try {
    const res = await api.get('/public/getAll-Alumini');
    console.log('Alumni data fetched successfully:', res.data);
    return res.data;
    
  } catch (error) {
    console.error('Error fetching alumni:', error.response?.data || error.message);
    console.error('Error details:', error);
    return [];
  }
};
