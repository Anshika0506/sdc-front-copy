import publicApi from '../axios'; // ✅ use the public Axios instance

export const getPeople = async () => {
  try {
    const res = await publicApi.get('/public/teamMember/getAll');
    console.log('Alumni data fetched successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching Peoples:', error.response?.data || error.message);
    console.error('Error details:', error);
    return [];
  }
};