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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Work from './components/work'; 
import ProjectDetails from "./components/ProjectDetails";
import './index.css';

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
