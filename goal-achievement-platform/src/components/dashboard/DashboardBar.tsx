'use client';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function DashboardBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <h1 className="text-2xl font-semibold">Welcome to the Dashboard</h1>
          <p className="mt-4 text-gray-600">This is your main content area.</p>
        </main>
      </div>
    </div>
  );
}

export default DashboardBar;