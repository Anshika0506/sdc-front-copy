import React from 'react';
import { Link, Outlet } from 'react-router-dom';


const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 space-y-4">
        <div className="text-2xl font-bold text-blue-600 mb-6">
          Admin Panel
        </div>
        <nav className="flex flex-col space-y-3 text-sm font-medium">
          <Link to="/admin/dashboard" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/admin/manage-home" className="hover:text-blue-500">Manage Home</Link>
          <Link to="/admin/manage-about" className="hover:text-blue-500">Manage About</Link>
          <Link to="/admin/manage-people" className="hover:text-blue-500">Manage People</Link>
          <Link to="/admin/manage-services" className="hover:text-blue-500">Manage Services</Link>
          <Link to="/admin/manage-work" className="hover:text-blue-500">Manage Work</Link>
          <Link to="/admin/manage-career" className="hover:text-blue-500">Manage Career</Link>
          <Link to="/admin/manage-contact" className="hover:text-blue-500">Manage Contact</Link>
          <Link to="/admin/login" className="text-red-500 hover:text-red-700 mt-4">Logout</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Optional: Header */}
        <header className="mb-6">
          <h1 className="text-xl font-semibold">Welcome, Admin</h1>
        </header>

        {/* Dynamic page content */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
