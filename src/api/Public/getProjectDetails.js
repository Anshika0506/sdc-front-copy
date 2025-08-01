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


import { publicApi } from '../axios'; // ✅ Fixed: named import

export const getProject = async () => {
  try {
    console.log('🚀 Fetching projects...');
    const res = await publicApi.get('/public/allproject');
    console.log('✅ Projects fetched:', res.data);
    return res.data;
  } catch (error) {
    console.error('❌ Error fetching projects:', error.response?.data || error.message);
    console.error('🔍 Response status:', error.response?.status);
    return [];
  }
};
