import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import AdminLayout from '../layout/AdminLayout';

import Home from '../pages/public/Home/HomeLayout';
import About from '../pages/public/About/About';
import Career from '../pages/public/Career/Career';
import Services from '../pages/public/Services/Services';
import Contact from '../pages/public/Contact/Contact';
import Work from '../pages/public/Work/Work';
import ProjectDetails from '../pages/public/Work/ProjectDetails';

import AdminLogin from '../pages/admin/Login';
import PrivateRoute from '../auth/PrivateRoute';
import HomePage from '../pages/admin/Hompage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<Work />} />
        <Route path="/career" element={<Career />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work/projectdetails" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* ✅ Admin Login */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ✅ Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="manage-home" replace />} />
        <Route path="manage-home" element={<HomePage />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
