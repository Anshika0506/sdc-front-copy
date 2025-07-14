import api from "../config"; // Make sure your axios instance is exported from config.js

// Update admin details
export const updateAdminDetails = async (updatedData) => {
  try {
    const response = await api.post("/admin/updateAdmin", updatedData);
    return response.data;
  } catch (error) {
    console.error("Failed to update admin details:", error);
    throw error;
  }
};

// Change admin password
export const changeAdminPassword = async (oldPassword, newPassword) => {
  try {
    const response = await api.post("/admin/change-password", {
      oldPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to change admin password:", error);
    throw error;
  }
};

// Optional: Get current admin profile
export const getAdminProfile = async () => {
  try {
    const response = await api.get("/admin/get-profile"); // Only if your backend supports this
    return response.data;
  } catch (error) {
    console.error("Failed to fetch admin profile:", error);
    throw error;
  }
};
