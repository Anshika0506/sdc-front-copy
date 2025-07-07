// // src/routes/AppRoutes.jsx

import { Routes, Route } from 'react-router-dom';

// Public pages
import Home from '../pages/public/Home/HomeLayout';
import About from '../pages/public/About/About';
// import People from '../pages/Public/People';
import Services from '../pages/public/Services/Services';
import Work from '../pages/public/Work/Work';
import ProjectDetails from '../pages/public/Work/ProjectDetails';
import Career from '../pages/public/Career/Career';
// import Contact from '../pages/public/Contact/Contact';

// Admin pages
import AdminLogin from '../pages/admin/Login';
import AdminLayout from '../AdminLayout';
// import AdminDashboard from '../pages/admin/Dashboard';
// import ManageHome from '../pages/admin/ManageHome';
// add more as needed...

const AppRoutes = () => (
  <Routes>
    {/* ✅ Public routes */}
    <Route path="/home" element={<Home />} />
    <Route path="/about" element={<About />} />
    {/* <Route path="/people" element={<People />} /> */}
    <Route path="/services" element={<Services />} />
    <Route path="/work" element={<Work />} />
    <Route path="/work/project/:title" element={<ProjectDetails />} />
    <Route path="/career" element={<Career />} />
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
