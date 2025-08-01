import { authApi } from '../../config'; // ✅ Use config.js for authenticated admin requests

export const postPeople = async (type, data) => {
  try {
    let url, payload;
    if (type === 'teamMembers') {
      url = '/admin/teamMember/add';
    } else if (type === 'alumni') {
      url = '/admin/alumini/saveAlumini';
    } else {
      throw new Error('Invalid type for postPeople');
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
    const response = await adminApi.post(url, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
