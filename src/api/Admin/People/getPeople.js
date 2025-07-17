import adminApi from '../../config';

export const getPeople = async () => {
  try {
    const response = await adminApi.get('/admin/people');
    return response.data;
  } catch (error) {
    throw error;
  }
};
