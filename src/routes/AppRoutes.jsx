import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import AdminLayout from '../layout/AdminLayout';

import Home from '../pages/public/Home/HomeLayout';
import About from '../pages/public/About/About';
import Gallery from '../pages/public/Gallery/Gallery';
import Career from '../pages/public/Career/Career';
import Services from '../pages/public/Services/Services';
import People from '../pages/public/People/PeopleLayout';
import Contact from '../pages/public/Contact/Contact';
import Work from '../pages/public/Work/Work';
import ProjectDetails from '../pages/public/Work/ProjectDetails';

import AdminLogin from '../pages/admin/Login';
import PrivateRoute from '../auth/PrivateRoute';
import HomePage from '../pages/admin/Hompage';
import AdminWork from '../pages/admin/Work';
import AdminServices from '../pages/admin/Services';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/work" element={<Work />} />
        <Route path="/career" element={<Career />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work/projectdetails" element={<ProjectDetails />} />
        <Route path="/people" element={<People />} />
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
        <Route path="manage-work" element={<AdminWork />} />
        <Route path="manage-services" element={<AdminServices />} />
        {/* Add more admin routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
