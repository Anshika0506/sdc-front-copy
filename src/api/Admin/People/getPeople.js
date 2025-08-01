import { publicApi } from '../../axios'; // ✅ Use axios.js for public endpoints (no credentials needed)

/**
 * Fetches people data from the backend.
 * @param {('teamMembers'|'alumni')} type - The type of people to fetch.
 *   - Use 'teamMembers' for Team Members
 *   - Use 'alumni' for Alumni
 * @returns {Promise<Array>} The list of people (team or alumni)
 */
export const getPeople = async (type) => {
  try {
    let url;
    if (type === 'teamMembers') {
      url = '/public/teamMember/getAll';
    } else if (type === 'alumni') {
      url = '/public/getAll-Alumini';
    } else {
      throw new Error('Invalid type passed to getPeople');
    }

    const response = await publicApi.get(url);
    console.log(`Fetched ${type}:`, response.data); 
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    throw error;
  }
};
