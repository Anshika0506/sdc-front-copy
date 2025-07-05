// src/App.jsx

// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// // import AppRoutes from './routes/AppRoutes';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import work from './components/work';
// import './index.css';

// const App = () => {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
        
//         <main className="flex-grow">
//           {/* <AppRoutes /> */}
//         </main>
//         {/* <Route path="/work" element={<work />} /> */}
//         <Footer />
//       </div>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
=======
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
>>>>>>> a7b21e664b5a4eab00279ff2d823da1d64ebe55b
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Work from './components/work'; 
import ProjectDetails from "./components/ProjectDetails";
import './index.css';

const LayoutWrapper = () => {
  const location = useLocation();

  // Define routes where Navbar/Footer should be hidden
  const hideLayoutRoutes = ['/admin/login'];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!shouldHideLayout && <Navbar />}

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!shouldHideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
<<<<<<< HEAD
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/work" element={<Work />} />
            <Route path="/project/:title" element={<ProjectDetails />} /> {/* <-- detail route */}
          </Routes>
        </main>

        <Footer />
      </div>
=======
      <LayoutWrapper />
>>>>>>> a7b21e664b5a4eab00279ff2d823da1d64ebe55b
    </Router>
  );
};

export default App;
