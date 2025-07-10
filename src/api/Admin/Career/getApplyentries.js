import api from '../../config';

export const getAppliedEntries = async () => {
  try {
    const res = await api.get('/admin/getAllContacts');
    return res.data;
  } catch (error) {
    console.error('Error fetching Applied Entries:', error.response?.data || error.message);
    return [];
  }
};
