"use client";
import React from "react";
import { X, FileEdit, ShoppingCart, CalendarCheck, ListChecks, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Document Editor",
      href: "/dashboard/Editor/management",
      icon: FileEdit,
    },
    {
      name: "Marketplace",
      href: "/dashboard/Marketplace/all-products",
      icon: ShoppingCart,
    },
    {
      name: "Goal Planner Leaderboard",
      href: "/dashboard/DailyPlannerMultiplayer/DisplayBoards",
      icon: CalendarCheck,
    },
    {
      name: "Task Manager",
      href: "/dashboard/TaskManager",
      icon: ListChecks,
    },
    {
      name: "Goal Tracker",
      href: "/dashboard/Goal_Tracker",
      icon: Target,
    },
  ];

  return (
    <>
      {/* Overlay (Mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0`}
        role="navigation"
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full p-4">
          {/* Mobile header */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h2 className="text-xl font-bold text-blue-400">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-700 transition"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="h-16 mb-6 hidden md:flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-400">MyApp</span>
          </div>

          {/* Navigation */}
          <ul className="space-y-2 flex-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`flex items-center p-3 rounded-lg transition-colors group 
                      ${
                        isActive
                          ? "bg-gray-700 text-blue-300"
                          : "hover:bg-gray-700 text-gray-300"
                      }`}
                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                  >
                    <Icon
                      className={`w-5 h-5 mr-3 transition-colors ${
                        isActive ? "text-blue-400" : "text-gray-400 group-hover:text-blue-300"
                      }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer */}
          <div className="mt-auto p-4 bg-gray-800 rounded-lg text-center">
            <div className="text-sm font-medium text-gray-300">Current Plan: <span className="text-blue-400">Pro</span></div>
            <button className="mt-2 text-xs text-blue-400 hover:underline">
              Upgrade for more features
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;