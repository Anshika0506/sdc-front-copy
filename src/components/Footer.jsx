

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 mt-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} SDC Team. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-blue-500">Privacy</a>
          <a href="#" className="hover:text-blue-500">Terms</a>
          <a href="#" className="hover:text-blue-500">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
