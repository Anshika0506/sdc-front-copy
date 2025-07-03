// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
      <LayoutWrapper />
    </Router>
  );
};

export default App;
