import React, { useState, useEffect, useRef } from "react";
import { getAdminProfile, updateAdminDetails, changeAdminPassword } from "../../api/Admin/profile";
import trash from "../../assets/delete.png";
import save from "../../assets/save.png";
import cross from "../../assets/cross.svg";
import edit from "../../assets/edit.png";
import icons from "../../assets/icons.png";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState([]);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [editDetails, setEditDetails] = useState({ name: "", contact_no: "", email: "", adminId: null });
  const [passwordFields, setPasswordFields] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const contentRef = useRef(null);

  // Fetch admin profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching admin profile...");
      
      const data = await getAdminProfile();
      console.log("Received admin data:", data);
      
      // Handle the response format from your backend
      let adminList;
      if (data.data && Array.isArray(data.data)) {
        adminList = data.data;
      } else if (Array.isArray(data)) {
        adminList = data;
      } else {
        adminList = [data];
      }
      
      console.log("Processed admin list:", adminList);
      setAdminData(adminList);
      
      // Get current admin ID from localStorage or auth context
      // You'll need to set this when the admin logs in
  const loggedInAdminId = localStorage.getItem('adminId');
setCurrentAdminId(loggedInAdminId ? parseInt(loggedInAdminId) : null);
      
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message || "Failed to fetch admin profile");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Updating admin details:", editDetails);
      
      // Make sure we include the adminId in the update
      const updateData = {
        adminId: editDetails.adminId,
        name: editDetails.name,
        contact_no: editDetails.contact_no,
        email: editDetails.email
      };
      
      await updateAdminDetails(updateData);
      alert("Admin details updated successfully!");
      closeEditDetailsModal();
      fetchProfile();
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update admin details: " + (error.response?.data?.message || error.message));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      console.log("Changing password for admin ID:", currentAdminId);
      
      // Include adminId in password change request
      await changeAdminPassword(passwordFields.oldPassword, passwordFields.newPassword, currentAdminId);
      alert("Password updated successfully!");
      closeChangePasswordModal();
      setPasswordFields({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password change error:", error);
      alert("Failed to change password: " + (error.response?.data?.message || error.message));
    }
  };

  const openEditDetailsModal = (admin) => {
    // Only allow editing if it's the current admin
    if (admin.adminId !== currentAdminId) {
      alert("You can only edit your own profile!");
      return;
    }
    
    setEditDetails({
      name: admin.name || "",
      contact_no: admin.contact_no || "",
      email: admin.email || "",
      adminId: admin.adminId
    });
    setShowEditDetailsModal(true);
  };

  const openChangePasswordModal = (admin) => {
    // Only allow password change if it's the current admin
    if (admin.adminId !== currentAdminId) {
      alert("You can only change your own password!");
      return;
    }
    
    setShowChangePasswordModal(true);
  };

  const closeEditDetailsModal = () => setShowEditDetailsModal(false);
  const closeChangePasswordModal = () => setShowChangePasswordModal(false);

  useEffect(() => {
    const header = document.querySelector(".header");
    const sidebar = document.querySelector(".sidebar");
    const shouldHide = showChangePasswordModal || showEditDetailsModal;
    if (header) header.style.display = shouldHide ? "none" : "block";
    if (sidebar) sidebar.style.display = shouldHide ? "none" : "block";
    return () => {
      if (header) header.style.display = "block";
      if (sidebar) sidebar.style.display = "block";
    };
  }, [showChangePasswordModal, showEditDetailsModal]);

  // Loading state
  if (loading) {
    return (
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px]">
        <div className="w-full h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
          <h2 className="text-[#333333] font-semibold text-2xl">Admin Details</h2>
        </div>
        <div className="w-full h-[722px] bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex items-center justify-center">
          <div className="text-white text-lg">Loading admin profile...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px]">
        <div className="w-full h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
          <h2 className="text-[#333333] font-semibold text-2xl">Admin Details</h2>
        </div>
        <div className="w-full h-[722px] bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex flex-col items-center justify-center">
          <div className="text-red-400 text-lg mb-4">Error: {error}</div>
          <button 
            onClick={fetchProfile}
            className="bg-blue-600 px-4 py-2 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!adminData || adminData.length === 0) {
    return (
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px]">
        <div className="w-full h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
          <h2 className="text-[#333333] font-semibold text-2xl">Admin Details</h2>
        </div>
        <div className="w-full h-[722px] bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex items-center justify-center">
          <div className="text-white text-lg">No admin data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px]">
      <div className="w-full h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
        <h2 className="text-[#333333] font-semibold text-2xl">Admin Details</h2>
      </div>

      <div className="w-full h-[722px] bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] flex flex-col">
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto scroll-container relative text-white p-10"
        >
          {adminData.map((admin, index) => (
            <div key={admin.adminId} className="mb-8 p-4 border border-gray-600 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <p className="text-base p-1"><strong className="text-[#8E8E8E]">Name:</strong> {admin.name}</p>
                  <p className="text-base p-1"><strong className="text-[#8E8E8E]">Email:</strong> {admin.email}</p>
                  <p className="text-base p-1"><strong className="text-[#8E8E8E]">Contact:</strong> {admin.contact_no}</p>
                  <p className="text-base p-1"><strong className="text-[#8E8E8E]">Admin ID:</strong> {admin.adminId}</p>
                  {admin.adminId === currentAdminId && (
                    <span className="text-green-400 text-sm font-semibold">(Current Admin)</span>
                  )}
                </div>
                
                {/* Show edit buttons only for current admin */}
                {admin.adminId === currentAdminId && (
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => openChangePasswordModal(admin)} 
                      className="bg-gray-700 px-3 py-1 rounded-md flex gap-2 items-center text-sm"
                    >
                      <img src={icons} className="w-4 h-4" alt="icon" />
                      CHANGE PASSWORD
                    </button>
                    <button 
                      onClick={() => openEditDetailsModal(admin)} 
                      className="bg-gray-600 px-3 py-1 rounded-md flex gap-2 items-center text-sm"
                    >
                      <img src={edit} className="w-4 h-4" alt="edit" />
                      EDIT DETAILS
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Details Modal */}
      {showEditDetailsModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          <div className="w-[700px] bg-[#1a1a1a] rounded-2xl p-8 shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Admin Details</h3>
              <button onClick={closeEditDetailsModal}>
                <img src={cross} alt="close" className="w-[25px] h-[25px]" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
              <input type="text" placeholder="Name" value={editDetails.name}
                onChange={(e) => setEditDetails({ ...editDetails, name: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <input type="text" placeholder="Contact Number" value={editDetails.contact_no}
                onChange={(e) => setEditDetails({ ...editDetails, contact_no: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <input type="email" placeholder="Email" value={editDetails.email}
                onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <div className="flex justify-end">
                <button type="submit" className="bg-green-600 px-4 py-2 rounded-md flex gap-2">
                  <img src={save} alt="save" className="w-5 h-5" />
                  SAVE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          <div className="w-[700px] bg-[#1a1a1a] rounded-2xl p-8 shadow-lg text-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Change Password</h3>
              <button onClick={closeChangePasswordModal}>
                <img src={cross} alt="close" className="w-[25px] h-[25px]" />
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
              <input type="password" placeholder="Old Password" value={passwordFields.oldPassword}
                onChange={(e) => setPasswordFields({ ...passwordFields, oldPassword: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <input type="password" placeholder="New Password" value={passwordFields.newPassword}
                onChange={(e) => setPasswordFields({ ...passwordFields, newPassword: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <input type="password" placeholder="Confirm New Password" value={passwordFields.confirmPassword}
                onChange={(e) => setPasswordFields({ ...passwordFields, confirmPassword: e.target.value })}
                className="bg-[#333] p-2 rounded-md"
              />
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md flex gap-2">
                  <img src={save} alt="save" className="w-5 h-5" />
                  UPDATE PASSWORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;