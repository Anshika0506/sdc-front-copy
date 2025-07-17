import adminApi from '../../config';

export const updatePeople = async (id, data) => {
  try {
    const response = await adminApi.put(`/admin/people/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
