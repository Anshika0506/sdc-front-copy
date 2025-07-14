import React, { useState, useEffect, useRef } from "react";
import { getAdminProfile, updateAdminDetails, changeAdminPassword } from "../../api/Admin/profile";
import trash from "../../assets/delete.png";
import save from "../../assets/save.png";
import cross from "../../assets/cross.svg";
import edit from "../../assets/edit.png";
import icons from "../../assets/icons.png";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [editDetails, setEditDetails] = useState({ name: "", contact_no: "", email: "" });
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
      const data = await getAdminProfile();
      setAdminData(data);
    } catch (error) {
      alert("Failed to fetch admin profile.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdminDetails(editDetails);
      alert("Admin details updated successfully!");
      closeEditDetailsModal();
      fetchProfile();
    } catch (error) {
      alert("Failed to update admin details.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordFields.newPassword !== passwordFields.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    try {
      await changeAdminPassword(passwordFields.oldPassword, passwordFields.newPassword);
      alert("Password updated successfully!");
      closeChangePasswordModal();
      setPasswordFields({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      alert("Failed to change password.");
    }
  };

  const openEditDetailsModal = () => {
    setEditDetails({
      name: adminData?.name || "",
      contact_no: adminData?.contact_no || "",
      email: adminData?.email || "",
    });
    setShowEditDetailsModal(true);
  };

  const closeEditDetailsModal = () => setShowEditDetailsModal(false);
  const openChangePasswordModal = () => setShowChangePasswordModal(true);
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

  if (!adminData) {
    return <div className="text-white p-10">Loading...</div>;
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
          <p className="text-base p-1"><strong className="text-[#8E8E8E]">Name:</strong> {adminData.name}</p>
          <p className="text-base p-1"><strong className="text-[#8E8E8E]">Email:</strong> {adminData.email}</p>
          <p className="text-base p-1"><strong className="text-[#8E8E8E]">Contact:</strong> {adminData.contact_no}</p>

          <div className="mt-10 flex flex-col gap-4">
            <button onClick={openChangePasswordModal} className="bg-gray-700 px-4 py-2 rounded-md flex gap-2 items-center w-fit">
              <img src={icons} className="w-5 h-5" alt="icon" />
              CHANGE PASSWORD
            </button>
            <button onClick={openEditDetailsModal} className="bg-gray-600 px-4 py-2 rounded-md flex gap-2 items-center w-fit">
              <img src={edit} className="w-6 h-6" alt="edit" />
              EDIT DETAILS
            </button>
          </div>
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
