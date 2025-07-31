

import { authApi } from "../axios"; 
import { checkSessionHealth, hasAuthCookie } from "../../utils/sessionUtils";

export const getAdminProfile = async () => {
  // With cookie-based auth, the server should return the current logged-in admin's profile
  const response = await authApi.get("/admin/profile");
  return response.data;
};


// Update admin details
export const updateAdminDetails = async (updatedData) => {
  try {
    console.log("Updating admin details:", updatedData);

    const response = await authApi.put("/admin/updateAdmin", updatedData);

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

    const response = await authApi.put("/admin/change-password", {
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

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    console.log("🔍 Checking authentication status...");
    console.log("🍪 Current cookies:", document.cookie);
    
    const response = await authApi.get("/auth/verify");
    console.log("✅ Authentication verified:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Authentication check failed:", error.response?.status, error.response?.data);
    throw error;
  }
};

// Quick test function for admin authentication
export const testAuth = async () => {
  try {
    console.log("🧪 Testing authentication...");
    checkSessionHealth(); // Show detailed cookie info
    
    if (!hasAuthCookie()) {
      return { 
        success: false, 
        error: "No authentication cookie found. Please login again.",
        needsLogin: true
      };
    }
    
    // Test the profile endpoint
    const profile = await authApi.get("/admin/profile");
    console.log("✅ Profile endpoint works:", profile.data);
    return { success: true, data: profile.data };
  } catch (error) {
    console.error("❌ Profile endpoint failed:", error.response?.status, error.response?.data);
    
    // Test auth verification endpoint
    try {
      const auth = await authApi.get("/auth/verify");
      console.log("✅ Auth verification works:", auth.data);
      return { success: true, authOnly: true, data: auth.data };
    } catch (authError) {
      console.error("❌ Auth verification also failed:", authError.response?.status, authError.response?.data);
      return { 
        success: false, 
        error: authError.response?.data,
        needsLogin: authError.response?.status === 401 || authError.response?.status === 403
      };
    }
  }
};

// Test session persistence specifically
export const testSessionPersistence = () => {
  console.log("🔍 Session Persistence Test:");
  console.log("🕐 Current time:", new Date().toISOString());
  checkSessionHealth();
  
  const hasAuth = hasAuthCookie();
  if (hasAuth) {
    console.log("✅ Authentication cookie found - session should persist");
  } else {
    console.log("❌ No authentication cookie - session will not persist");
    console.log("💡 This means you'll need to login after every page refresh");
  }
  
  return hasAuth;
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
        const response = await authApi.get(endpoint);
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