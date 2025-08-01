import { authApi } from '../../config'; // ✅ Use config.js for authenticated admin requests

export const deletePeople = async (type, id) => {
  try {
    let url;
    if (type === 'teamMembers') {
      url = `/admin/teamMember/delete/${id}`;
    } else if (type === 'alumni') {
      url = `/admin/alumini/delete-alumini/${id}`;
    } else {
      throw new Error('Invalid type for deletePeople');
    }
    const response = await adminApi.delete(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
