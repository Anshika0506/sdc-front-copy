// Updated API functions with better error handling and debugging

import api from "../config"; // Make sure your axios instance is exported from config.js

// Get current admin profile - FIXED
export const getAdminProfile = async () => {
  try {
    console.log("Fetching admin profile...");
    
    // Try different endpoints based on your backend
    let response;
    
    // Option 1: If you have a specific endpoint for current admin
    try {
      response = await api.get("/admin/profile"); // or "/admin/current"
      console.log("Admin profile response:", response.data);
      return response.data;
    } catch (error) {
      console.log("Primary endpoint failed, trying alternative...");
      
      // Option 2: If you need to get from all-admins endpoint
      response = await api.get("/admin/all-admins");
      console.log("All admins response:", response.data);
      
      // If response is an array, get the first admin or filter by current user
      if (Array.isArray(response.data)) {
        return response.data[0]; // or filter by current user ID
      }
      
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch admin profile:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Update admin details
export const updateAdminDetails = async (updatedData) => {
  try {
    console.log("Updating admin details:", updatedData);
    
    // Include adminId in the request body or URL parameter
    const response = await api.post("/admin/updateAdmin", updatedData);
    // Alternative if your backend expects adminId in URL:
    // const response = await api.post(`/admin/updateAdmin/${updatedData.adminId}`, updatedData);
    
    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update admin details:", error);
    console.error("Error details:", error.response?.data);
    throw error;
  }
};

// Change admin password
export const changeAdminPassword = async (oldPassword, newPassword, adminId) => {
  try {
    console.log("Changing admin password for ID:", adminId);
    
    const response = await api.post(`/admin/change-password/${adminId}`, {
      oldPassword,
      newPassword
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