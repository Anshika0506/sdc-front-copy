// import api from '../../config';

// export const getProject = async () => {
//   try {
//     const res = await api.get('/public/allproject');
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching Projects:', error.response?.data || error.message);
//     return [];
//   }
// };


import api from '../axios'; // Use publicApi instead of config for public endpoints

export const getProject = async () => {
  try {
    const res = await api.get('/public/allproject');
    return res.data;
  } catch (error) {
    console.error('Error fetching Projects:', error.response?.data || error.message);
    return [];
  }
};
