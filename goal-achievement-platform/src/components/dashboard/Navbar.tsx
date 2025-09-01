import React from 'react';
import { Menu, Bell, User, Search, LogOut } from 'lucide-react';

interface Props {
  toggleSidebar: () => void;
  onLogout: () => void;   // ✅ new prop for logout
  user?: {
    displayName?: string | null;
    email?: string | null;
  } | null;
}

const Navbar: React.FC<Props> = ({ toggleSidebar, user, onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-md rounded-sm">
      {/* Left Section */}
      <div className="flex items-center">
        <button 
          className="md:hidden mr-4 p-1 rounded-md hover:bg-blue-700 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold hidden md:block">Dashboard</h1>
      </div>
      
      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-200" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-700 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <button className="p-1 relative rounded-full hover:bg-blue-700 transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile + Logout */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <span className="hidden md:inline font-medium">
            {user?.displayName || user?.email || "Guest"}
          </span>
          <button 
            onClick={onLogout} 
            className="flex items-center space-x-1 px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
