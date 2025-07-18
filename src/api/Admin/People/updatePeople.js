import adminApi from '../../config';

export const updatePeople = async (type, id, data) => {
  try {
    let url, payload;
    if (type === 'teamMembers') {
      url = `/admin/teamMember/update/${id}`;
    } else if (type === 'alumni') {
      url = `/admin/alumini/update-Alumini/${id}`;
    } else {
      throw new Error('Invalid type for updatePeople');
    }

    // Always use FormData
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => formData.append(key, v));
      } else if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });
    payload = formData;

    // No Content-Type header, let axios/browser handle it!
    const response = await adminApi.put(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
