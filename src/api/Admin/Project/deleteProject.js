import api from '../../config';

export const deleteProject = async (projectID) => {
  try {
const res = await api.delete(`/admin/projects/deleteproject/${projectID}`);    return res.data;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw error;
  }
};


