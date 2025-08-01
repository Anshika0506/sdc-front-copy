import { publicApi } from '../../axios'; // ✅ Use axios.js for public endpoints (no credentials needed)

export const getProject = async () => {
  try {
    const res = await publicApi.get('/public/allproject');
    return res.data;
  } catch (error) {
    console.error('Error fetching Projects:', error.response?.data || error.message);
    return [];
  }
};

