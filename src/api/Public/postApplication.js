import api from "../axios"; // your Axios instance

export const submitApplicationForm = async (formData) => {
  return await api.post("/public/form/application-form", formData);
};
