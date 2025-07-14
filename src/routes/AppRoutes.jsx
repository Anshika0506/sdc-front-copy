import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layout/MainLayout';
import AdminLayout from '../layout/AdminLayout';

// Public Pages
import Home from '../pages/public/Home/HomeLayout';
import About from '../pages/public/About/About';
import Gallery from '../pages/public/Gallery/Gallery';
import Career from '../pages/public/Career/Career';
import Services from '../pages/public/Services/Services';
import People from '../pages/public/People/PeopleLayout';
import Contact from '../pages/public/Contact/Contact';
import Work from '../pages/public/Work/Work';
import ProjectDetails from '../pages/public/Work/ProjectDetails';
import Error404Page from '../pages/public/NotFound';

// Admin Auth
import AdminLogin from '../pages/admin/Login';
import PrivateRoute from '../auth/PrivateRoute';

// Admin Pages
import HomePage from '../pages/admin/Homepage'; // Testimonials Management
import AdminAbout from '../pages/admin/AboutPage';
import AdminWork from '../pages/admin/Work';
import AdminServices from '../pages/admin/Services';
import FAQSection from '../pages/admin/FAQSection';
import CareerPage from '../pages/admin/CareerPage';
import PeoplePage from '../pages/admin/PeoplePage';
import Profile from '../pages/admin/AdminProfile';


const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ PUBLIC ROUTES */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/career" element={<Career />} />
        <Route path="/services" element={<Services />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/projectdetails" element={<ProjectDetails />} />
        <Route path="/people" element={<People />} />
        <Route path="/contact" element={<Contact />} />

        {/* Fallback for Public Pages */}
        <Route path="*" element={<Error404Page />} />
      </Route>

      {/* ✅ ADMIN LOGIN */}
      <Route path="/login" element={<AdminLogin />} />

      {/* ✅ PROTECTED ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        {/* Redirect to default admin section */}
        <Route index element={<Navigate to="manage-testimonials" replace />} />

        {/* Admin Pages */}
        <Route path="manage-testimonials" element={<HomePage />} />
        <Route path="manage-about" element={<AdminAbout />} />
        <Route path="manage-work" element={<AdminWork />} />
        <Route path="manage-services" element={<AdminServices />} />
        <Route path="manage-faqs" element={<FAQSection />} />
        <Route path="manage-career" element={<CareerPage />} />
        <Route path="manage-people" element={<PeoplePage />} />
        <Route path="profile" element={<Profile />} />

        {/* Fallback for unknown admin routes */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
