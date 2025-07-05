<<<<<<< HEAD
// import { Routes, Route } from 'react-router-dom';
// import Home from '../pages/Home/Home';
// import About from '../pages/About/About';
// import People from '../pages/People/People';
// import Services from '../pages/Services/Services';
 import Work from '../pages/Work/Work';
// import Career from '../pages/Career/Career';
// import Contact from '../pages/Contact/Contact';
=======
// // src/routes/AppRoutes.jsx
>>>>>>> a7b21e664b5a4eab00279ff2d823da1d64ebe55b

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
