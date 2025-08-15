import React from 'react';
import { X, FileEdit, ShoppingCart, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    {
      name: "Document Editor",
      href: "/dashboard/Editor/management",
      icon: <FileEdit className="w-5 h-5" />
    },
    {
      name: "MarketPlace",
      href: "/dashboard/Marketplace/all-products",
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      name: "Goal Planner Leaderboard",
      href: "/dashboard/DailyPlannerMultiplayer/DisplayBoards",
      icon: <CalendarCheck className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 shadow-xl`}>
        <div className="flex justify-between items-center mb-8 md:hidden">
          <h2 className="text-xl font-bold text-blue-400">Navigation</h2>
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="h-16 mb-6 hidden md:flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-400">MyApp</span>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.href}
                className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors group"
                onClick={() => window.innerWidth < 768 && toggleSidebar()}
              >
                <span className="mr-3 text-blue-400 group-hover:text-blue-300 transition-colors">
                  {item.icon}
                </span>
                <span className="font-medium group-hover:text-blue-300 transition-colors">
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-700 rounded-lg">
          <div className="text-sm text-gray-300">Current Plan: Pro</div>
          <div className="text-xs text-gray-400 mt-1">Upgrade for more features</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;