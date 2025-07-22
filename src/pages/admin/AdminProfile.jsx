import React, { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAdminProfile,
  updateAdminDetails,
  changeAdminPassword,
} from "../../api/Admin/profile";

// import trash from "../../assets/delete.png";

import save from "../../assets/save.png";

import cross from "../../assets/cross.svg";

import edit from "../../assets/edit.png";

import profileButton from "../../assets/profile button.png";

import keyIcon from "../../assets/key.png";

const AdminProfile = () => {
  const [page, setPage] = useState(1);

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  const contentRef = useRef(null);

  const navigate = useNavigate();

  // Password form state

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",

    newPassword: "",

    confirmPassword: "",
  });

  // Edit details form state

  const [editDetails, setEditDetails] = useState({
    name: "",

    contact_no: "",

    email: "",
  });

  // Password validation errors

  const [passwordErrors, setPasswordErrors] = useState({});

  // Load admin data on component mount

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await getAdminProfile();

      // Normalize and set admin data

      setData({
        adminId: data.adminId || data.AdminId || "",

        name: data.name || "",

        contact_no: data.contact_no || "",

        email: data.email || "",

        role: data.role || "Admin",

        createdAt: data.createdAt || "",
      });

      setEditDetails({
        name: data.name || "",

        contact_no: data.contact_no || "",

        email: data.email || "",
      });
    } catch (err) {
      console.error("Failed to load admin data:", err);

      // Show error instead of navigating

      if (err.response?.status === 401 || err.response?.status === 403) {
        setError("Unauthorized or session expired.");
      } else {
        setError("Failed to load admin profile. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers

  const openChangePasswordModal = () => {
    setPasswordForm({
      oldPassword: "",

      newPassword: "",

      confirmPassword: "",
    });

    setPasswordErrors({});

    setShowChangePasswordModal(true);
  };

  const closeChangePasswordModal = () => {
    setShowChangePasswordModal(false);

    setPasswordForm({
      oldPassword: "",

      newPassword: "",

      confirmPassword: "",
    });

    setPasswordErrors({});
  };

  const openEditDetailsModal = () => {
    setEditDetails({
      name: data.name || "",

      contact_no: data.contact_no || "",

      email: data.email || "",
    });

    setShowEditDetailsModal(true);
  };

  const closeEditDetailsModal = () => {
    setShowEditDetailsModal(false);

    setEditDetails({
      name: "",

      contact_no: "",

      email: "",
    });
  };

  // Password validation

  const validatePassword = () => {
    const errors = {};

    if (!passwordForm.oldPassword) {
      errors.oldPassword = "Old password is required";
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }

    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (passwordForm.oldPassword === passwordForm.newPassword) {
      errors.newPassword = "New password must be different from old password";
    }

    setPasswordErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Handle password change

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      setChangingPassword(true);

      await changeAdminPassword(
        passwordForm.oldPassword,

        passwordForm.newPassword,

        data.adminId || data.AdminId
      );

      alert("Password changed successfully!");

      closeChangePasswordModal();
    } catch (err) {
      console.error("Failed to change password:", err);

      if (err.response?.status === 400) {
        setPasswordErrors({
          oldPassword: "Current password is incorrect",
        });
      } else {
        alert("Failed to change password. Please try again.");
      }
    } finally {
      setChangingPassword(false);
    }
  };

  // Handle details update

  const handleUpdateDetails = async (e) => {
    e.preventDefault();

    // Basic validation

    if (!editDetails.name.trim()) {
      alert("Name is required");

      return;
    }

    if (!editDetails.email.trim()) {
      alert("Email is required");

      return;
    }

    // Email validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(editDetails.email)) {
      alert("Please enter a valid email address");

      return;
    }

    try {
      setUpdating(true);

      const updateData = {
        adminId: data.adminId || data.AdminId,

        name: editDetails.name.trim(),

        contact_no: editDetails.contact_no.trim(),

        email: editDetails.email.trim(),
      };

      const updatedData = await updateAdminDetails(updateData);

      // Update local state

      setData((prev) => ({
        ...prev,

        name: editDetails.name.trim(),

        contact_no: editDetails.contact_no.trim(),

        email: editDetails.email.trim(),
      }));

      alert("Details updated successfully!");

      closeEditDetailsModal();
    } catch (err) {
      console.error("Failed to update details:", err);

      if (err.response?.status === 400) {
        alert("Please check your input data");
      } else if (err.response?.status === 409) {
        alert("Email already exists. Please use a different email.");
      } else {
        alert("Failed to update details. Please try again.");
      }
    } finally {
      setUpdating(false);
    }
  };

  // Hide header/sidebar when modals are open

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
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px] flex items-center justify-center">
        <div className="text-white text-xl">Loading admin profile...</div>
      </div>
    );
  }

  // Error state

  if (error) {
    return (
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>

          <button
            onClick={loadAdminData}
            className="px-4 py-2 bg-[#8E8E8E] text-white rounded-md hover:bg-[#7E7E7E]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // No admin data

  if (!data) {
    return (
      <div className="w-[1136px] h-[855px] absolute top-[132px] left-[272px] flex items-center justify-center">
        <div className="text-white text-xl">No admin data available</div>
      </div>
    );
  }

  return (
    <div className="w-[1136px] absolute top-[132px] left-[272px]">
      <div className="w-[1136px] h-[60px] flex justify-between items-center px-[28px] py-[8px] bg-[#8E8E8E] rounded-t-2xl">
        <h2 className="text-[#333333] font-semibold text-3xl">Admin Profile</h2>
      </div>

      <div className="w-full bg-[#141414] rounded-b-xl shadow-[2px_2px_6px_0px_#FFFFFF26] min-h-[240px] flex flex-col relative">
        {/* Profile Info */}

        <div
          className="flex flex-row items-center pl-10 pr-4 pt-8 pb-4 mb-8"
          style={{ fontSize: "1.15rem" }}
        >
          {/* Profile Icon (left, as main visual) */}

          <img
            src={profileButton}
            alt="profile"
            className="w-[96px] h-[96px] opacity-70 mr-6"
          />

          {/* Info */}

          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center mb-1">
              <span className="text-[#8E8E8E] font-bold text-4xl mr-4 font-mono">
                Name:
              </span>

              <span
                className="text-white font-extrabold text-4xl font-mono"
                style={{ fontWeight: 800 }}
              >
                {data.name}
              </span>
            </div>

            <div className="flex flex-row items-center mb-1">
              <span className="text-[#8E8E8E] font-bold text-base mr-2 font-mono">
                Email:
              </span>

              <span className="text-white font-mono text-base">
                {data.email}
              </span>
            </div>

            <div className="flex flex-row items-center mb-6">
              <span className="text-[#8E8E8E] font-bold text-base mr-2 font-mono">
                Contact Number:
              </span>

              <span className="text-white font-mono text-base">
                {data.contact_no}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons Box with white line at the top */}

        <div
          className="flex flex-row items-center gap-[10px] border-t border-white"
          style={{
            width: "1136px",

            height: "93px",

            opacity: 1,

            paddingTop: "1.25rem", // Spacing/5

            paddingRight: "2rem", // Spacing/7

            paddingBottom: "2rem", // Spacing/7

            paddingLeft: "2rem", // Spacing/7

            borderTopWidth: "1px",
          }}
        >
          <button
            onClick={openChangePasswordModal}
            className="flex items-center justify-center cursor-pointer hover:bg-[#ACACAC20]"
            style={{
              width: "535px",

              height: "45px",

              borderWidth: "1px",

              borderStyle: "solid",

              borderColor: "#fff",

              borderRadius: "12px",

              gap: "8px",

              paddingTop: "0.5rem",

              paddingBottom: "0.5rem",

              paddingLeft: "0.25rem",

              paddingRight: "0.25rem",

              opacity: 1,

              backdropFilter: "blur(4px)",

              background: "rgba(172,172,172,0.05)",

              boxShadow:
                "2px 4px 4px 0px #00000040, 2px 2px 8px 0px #FFFFFF40 inset",
            }}
          >
            <img src={keyIcon} alt="change password" className="w-5 h-5" />

            <span className="text-white font-semibold text-lg uppercase">
              CHANGE PASSWORD
            </span>
          </button>

          <button
            onClick={openEditDetailsModal}
            className="flex items-center justify-center cursor-pointer hover:bg-[#ACACAC60]"
            style={{
              width: "535px",

              height: "45px",

              borderWidth: "1px",

              borderStyle: "solid",

              borderColor: "#fff",

              borderRadius: "12px",

              gap: "8px",

              paddingTop: "0.5rem",

              paddingBottom: "0.5rem",

              paddingLeft: "0.25rem",

              paddingRight: "0.25rem",

              opacity: 1,

              backdropFilter: "blur(4px)",

              background: "rgba(172,172,172,0.25)",

              boxShadow:
                "2px 4px 4px 0px #00000040, 2px 2px 8px 0px #FFFFFF40 inset",
            }}
          >
            <img src={edit} alt="edit" className="w-6 h-6" />

            <span className="text-white font-semibold text-lg uppercase">
              EDIT DETAILS
            </span>
          </button>
        </div>
      </div>

      {/* Change Password Modal */}

      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          <div className="w-[1094px] h-[411px] bg-[#1a1a1a] opacity-100 rotate-0 rounded-2xl shadow-[0px_4px_10px_0px_#00000040] relative">
            <div className="w-full h-[60px] flex justify-between items-center px-6 py-4 bg-[#8E8E8E] opacity-100 rotate-0 rounded-t-2xl">
              <h3
                style={{ fontWeight: "600", fontSize: 24 }}
                className="text-[#333333] p-1 font-inter font-semibold leading-[24px] tracking-[0.02em] h-[32px] w-[270px]"
              >
                Change Your Password
              </h3>

              <button onClick={closeChangePasswordModal}>
                <img src={cross} alt="close" className="w-[25px] h-[25px]" />
              </button>
            </div>

            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-1"
            >
              <div className="p-8">
                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                  OLD PASSWORD
                </label>

                <input
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                  className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  required
                  minLength={6}
                  maxLength={128}
                />

                {passwordErrors.oldPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {passwordErrors.oldPassword}
                  </p>
                )}

                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                  NEW PASSWORD
                </label>

                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  required
                  minLength={6}
                  maxLength={128}
                />

                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {passwordErrors.newPassword}
                  </p>
                )}

                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                  RE-ENTER NEW PASSWORD
                </label>

                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="w-[1018px] font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  required
                  minLength={6}
                  maxLength={128}
                />

                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mb-2">
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="h-[73px] w-[1094px] flex justify-end bg-[#303030]/60 rounded-b-xl border-t border-[#5a5a5a] shrink-0">
                <button
                  type="submit"
                  disabled={changingPassword}
                  className="font-mono my-3 mx-7 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[254px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-3 px-4 gap-3 disabled:opacity-50"
                >
                  <img src={save} alt="" className="h-[25px] w-[25px]" />

                  <span className="text-white font-semibold text-base leading-[24px] uppercase">
                    {changingPassword ? "UPDATING..." : "UPDATE PASSWORD"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Details Modal */}

      {showEditDetailsModal && (
        <div className="fixed inset-0 bg-[#000000CC] flex items-center justify-center z-[9999]">
          <div className="w-[1094px] h-[411px] bg-[#1a1a1a] opacity-100 rotate-0 rounded-2xl shadow-[0px_4px_10px_0px_#00000040] relative">
            <div className="w-full h-[60px] flex justify-between items-center px-6 py-4 bg-[#8E8E8E] opacity-100 rotate-0 rounded-t-2xl">
              <h3 className="text-[#333333] font-inter text-xl font-semibold leading-[24px] tracking-[0.02em] w-full">
                Edit Admin Details
              </h3>

              <button onClick={closeEditDetailsModal}>
                <img src={cross} alt="close" className="w-[25px] h-[25px]" />
              </button>
            </div>

            <form onSubmit={handleUpdateDetails} className="flex flex-col">
              <div className="p-8">
                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase">
                  NAME
                </label>

                <input
                  type="text"
                  value={editDetails.name}
                  onChange={(e) =>
                    setEditDetails((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-[1018px] font-mono mb-2 px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  required
                  minLength={2}
                  maxLength={50}
                  pattern="^[a-zA-Z\s]+$"
                  title="Name should only contain letters and spaces"
                />

                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase mt-2">
                  CONTACT NUMBER
                </label>

                <input
                  type="tel"
                  value={editDetails.contact_no}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    setEditDetails((prev) => ({ ...prev, contact_no: value }));
                  }}
                  className="w-[1018px] font-mono px-3 py-2 mb-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  minLength={10}
                  maxLength={15}
                  pattern="[0-9]{10,15}"
                  title="Contact number should be 10-15 digits only"
                />

                <label className="text-white font-mono text-base font-bold leading-[24px] tracking-[0.02em] uppercase mt-2">
                  EMAIL
                </label>

                <input
                  type="email"
                  value={editDetails.email}
                  onChange={(e) =>
                    setEditDetails((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-[1018px] font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] bg-[#333333]"
                  required
                  maxLength={100}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="Please enter a valid email address"
                />
              </div>

              <div className="h-[75px] w-[1094px] flex justify-end bg-[#303030]/60 rounded-b-xl shrink-0">
                <button
                  type="submit"
                  disabled={updating}
                  className="font-mono my-4 mx-7 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 px-4 gap-3 disabled:opacity-50"
                >
                  <img src={save} alt="" className="h-[22px] w-[22px]" />

                  <span className="text-white font-semibold font-mono text-base leading-[24px] uppercase">
                    {updating ? "SAVING..." : "SAVE"}
                  </span>
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
