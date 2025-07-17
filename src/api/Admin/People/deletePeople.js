import adminApi from '../../config';

export const deletePeople = async (id) => {
  try {
    const response = await adminApi.delete(`/admin/people/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
