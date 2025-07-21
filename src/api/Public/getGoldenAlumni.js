import publicApi from '../axios';

export const getGoldenAlumini = async () => {
  try {
    const res = await publicApi.get('/public/getAll-Alumini');
    console.log("Raw response data:", res.data);

    const alumniList = res.data?.data || [];

    const sorted = alumniList
      .map((a) => ({ ...a, parsedLpa: parseFloat(a.lpa) }))
      .filter((a) => {
        const valid = !isNaN(a.parsedLpa);
        if (!valid) console.warn("Invalid LPA found:", a.lpa);
        return valid;
      })
      .sort((a, b) => b.parsedLpa - a.parsedLpa)
      .slice(0, 3);

    console.log("Top 3 golden alumni:", sorted);
    return sorted;
  } catch (error) {
    console.error('Error fetching golden alumni:', error);
    return [];
  }
};
