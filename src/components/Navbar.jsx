

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">SDC</Link>
        </div>
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-500">About</Link></li>
          <li><Link to="/people" className="hover:text-blue-500">People</Link></li>
          <li><Link to="/services" className="hover:text-blue-500">Services</Link></li>
          <li><Link to="/work" className="hover:text-blue-500">Work</Link></li>
          <li><Link to="/career" className="hover:text-blue-500">Career</Link></li>
          <li><Link to="/contact" className="hover:text-blue-500">Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
