// src/routes/AppRoutes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import AdminLayout from '../layout/AdminLayout';

import AdminLogin from '../pages/admin/Login';
import Work from '../pages/public/Work/Work';
import ProjectDetails from '../pages/public/Work/ProjectDetails';

// import other public and admin pages as needed

const AppRoutes = () => {
  return (
    <Routes>

      {/* ✅ Public Site (wrapped in MainLayout) */}
      <Route element={<MainLayout />}>
        {/* Add all public routes inside here */}
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/people" element={<People />} /> */}
        <Route path="/work" element={<Work />} />
        <Route path="/work/projectdetails" element={<ProjectDetails />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Route>

      {/* ✅ Admin Login — does NOT use any layout */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ✅ Admin Dashboard — wrapped in AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Example nested routes */}
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="manage-home" element={<ManageHome />} /> */}
      </Route>

    </Routes>
  );
};

export default AppRoutes;
