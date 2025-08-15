'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function DashboardBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
              <p className="text-gray-600">Here's what's happening with your projects today.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example cards */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Documents</h2>
                <p className="text-gray-600">View and edit your recent files</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Marketplace Stats</h2>
                <p className="text-gray-600">Track your marketplace activity</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Goal Progress</h2>
                <p className="text-gray-600">Check your planner achievements</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardBar;