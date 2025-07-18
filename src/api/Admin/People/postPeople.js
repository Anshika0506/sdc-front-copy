import adminApi from '../../config';

/**
 * Fetches people data from the backend.
 * @param {('teamMembers'|'alumni')} type - The type of people to fetch.
 *   - Use 'teamMembers' for Team Members
 *   - Use 'alumni' for Alumni
 * @returns {Promise<Array>} The list of people (team or alumni)
 */
export const postPeople = async (type, data) => {
  try {
    let url;
    if (type === 'teamMembers') {
      url = '/admin/teamMember/add';
    } else if (type === 'alumni') {
      url = '/admin/alumini/saveAlumini';
    } else {
      throw new Error('Invalid type for postPeople');
    }
    const response = await adminApi.post(url, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
