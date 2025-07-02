// // src/routes/AppRoutes.jsx

import { Routes, Route } from 'react-router-dom';

// Public pages
// import Home from '../pages/Public/Home';
// import About from '../pages/Public/About';
// import People from '../pages/Public/People';
// import Services from '../pages/Public/Services';
// import Work from '../pages/Public/Work';
// import Career from '../pages/Public/Career';
// import Contact from '../pages/Public/Contact';

// Admin pages
import AdminLogin from '../pages/admin/Login';
import AdminLayout from '../AdminLayout';
// import AdminDashboard from '../pages/admin/Dashboard';
// import ManageHome from '../pages/admin/ManageHome';
// add more as needed...

const AppRoutes = () => (
  <Routes>
    {/* ✅ Public routes */}
    {/* <Route path="/" element={<Home />} /> */}
    {/* <Route path="/about" element={<About />} /> */}
    {/* <Route path="/people" element={<People />} /> */}
    {/* <Route path="/services" element={<Services />} /> */}
    {/* <Route path="/work" element={<Work />} /> */}
    {/* <Route path="/career" element={<Career />} /> */}
    {/* <Route path="/contact" element={<Contact />} /> */}

    {/* ✅ Admin login route - without layout */}
    <Route path="/admin/login" element={<AdminLogin />} />

    {/* ✅ Admin routes - with AdminLayout */}
    <Route path="/admin" element={<AdminLayout />}>
      {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
      {/* <Route path="manage-home" element={<ManageHome />} /> */}
      {/* Add other manage routes */}
    </Route>
  </Routes>
);

export default AppRoutes;
