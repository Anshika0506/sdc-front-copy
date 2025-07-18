import adminApi from '../../config';




export const updatePeople = async (type, id, data) => {
  try {
    let url;
    if (type === 'teamMembers') {
      url = `/admin/teamMember/update/${id}`;
    } else if (type === 'alumni') {
      url = `/admin/alumini/update-alumini/${id}`;
    } else {
      throw new Error('Invalid type for updatePeople');
    }
    const response = await adminApi.put(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};