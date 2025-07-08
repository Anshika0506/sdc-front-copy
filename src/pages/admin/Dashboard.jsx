import React from 'react';
import { useAuth } from '../../auth/AuthContext';

const Dashboard = () => {
  const { admin } = useAuth();

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-400">1,234</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Projects</h3>
            <p className="text-3xl font-bold text-green-400">56</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-yellow-400">$12,345</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-2">Messages</h3>
            <p className="text-3xl font-bold text-purple-400">89</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Admin Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Name:</p>
              <p className="text-white font-semibold">{admin?.name}</p>
            </div>
            <div>
              <p className="text-gray-400">Email:</p>
              <p className="text-white font-semibold">{admin?.email}</p>
            </div>
            <div>
              <p className="text-gray-400">Admin ID:</p>
              <p className="text-white font-semibold">{admin?.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Status:</p>
              <p className="text-green-400 font-semibold">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;