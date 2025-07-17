import adminApi from '../../config';

export const postPeople = async (data) => {
  try {
    const response = await adminApi.post('/admin/people', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
