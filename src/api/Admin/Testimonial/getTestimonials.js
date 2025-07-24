// import api from '../../config';

// export const getTestimonials = async () => {
//   try {
//     const res = await api.get('/public/testimonies/All');
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching testimonials:', error.response?.data || error.message);
//     return [];
//   }
// };


// import publicApi from '../../axios'; // ✅ Use public instance instead of config

// export const getTestimonials = async () => {
//   try {
//     const res = await publicApi.get('/public/testimonies/All');
//     return res.data;
//   } catch (error) {
//     console.error('Error fetching testimonials:', error.response?.data || error.message);
//     return [];
//   }
// };


import { publicApi } from '../../axios'; // ✅ Fixed: named import

export const getTestimonials = async () => {
  try {
    const res = await publicApi.get('/public/testimonies/All');
    return res.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error.response?.data || error.message);
    return [];
  }
};
