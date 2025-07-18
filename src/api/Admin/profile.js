

import api from "../config"; 


export const getAdminProfile = async () => {
  const response = await api.get("/admin/all-admins");
  if (response.data && Array.isArray(response.data.data)) {
    // Get adminId from localStorage or context (set after login)
    const adminId = localStorage.getItem('adminId');
    // If you store as number, ensure type matches!
    const myAdmin = response.data.data.find(x => String(x.adminId) === String(adminId));
    if (!myAdmin) throw new Error("Current admin not found");
    return myAdmin;
  }
  throw new Error("Unexpected admin API structure");
};


// Update admin details
export const updateAdminDetails = async (updatedData) => {
  try {
    console.log("Updating admin details:", updatedData);

    const response = await api.put("/admin/updateAdmin", updatedData);

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update admin details:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};
// Change admin password
export const changeAdminPassword = async (oldPassword, newPassword) => {
  try {
    console.log("Changing admin password");

    const response = await api.put("/admin/change-password", {
      oldPassword,
      newPassword,
    });

    console.log("Password change response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to change admin password:", error);
    throw error;
  }
};

// Alternative function to test API connectivity
export const testAdminAPI = async () => {
  try {
    console.log("Testing admin API endpoints...");
    
    // Test different possible endpoints
    const endpoints = [
      "/admin/profile",
      "/admin/current",
      "/admin/all-admins",
      "/admin"
    ];
    
    for (const endpoint of endpoints) {
      try {
        const response = await api.get(endpoint);
        console.log(`✅ ${endpoint} works:`, response.data);
        return { endpoint, data: response.data };
      } catch (error) {
        console.log(`❌ ${endpoint} failed:`, error.response?.status);
      }
    }
    
    throw new Error("No working endpoints found");
  } catch (error) {
    console.error("API test failed:", error);
    throw error;
  }
};