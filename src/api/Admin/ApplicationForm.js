import api from "../config"; // your Axios instance with auth

// Get all applications
export const getAllApplications = async () => {
  return await api.get("/admin/application-form/getAll");
};

// Get application by ID
export const getApplicationById = async (id) => {
  return await api.get(`/admin/application-form/get/${id}`);
};

// Delete application by ID
export const deleteApplicationById = async (id) => {
  return await api.delete(`/admin/application-form/delete/${id}`);
};
