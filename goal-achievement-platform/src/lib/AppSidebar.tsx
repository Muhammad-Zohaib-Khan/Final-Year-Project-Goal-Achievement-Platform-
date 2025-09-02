"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Menu,
  FileEdit,
  ShoppingCart,
  CalendarCheck,
  ListChecks,
  Target,
  LayoutDashboard,
  Handshake
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

type Props = {};

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
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
    name:"Team Management",
    href:"/dashboard/DailyPlannerMultiplayer/team",
    icon: Handshake
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

const Bar = (props: Props) => {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close sidebar when a menu item is clicked
  const handleMenuItemClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex relative">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`p-2 m-2 rounded-lg transition-colors ${
          open ? "bg-amber-100" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {open ? <X className="h-5 w-5 text-amber-600" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50">
          <div ref={sidebarRef} className="absolute left-0 top-0 h-full">
            <Sidebar variant="floating" className="z-50 h-full">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">Assignbase</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                          <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive}
                              className={isActive ? "bg-amber-100 text-amber-700" : ""}
                            >
                              <a
                                href={item.href}
                                className="flex items-center gap-2 px-2 py-1"
                                onClick={handleMenuItemClick}
                              >
                                <item.icon
                                  size={18}
                                  className={isActive ? "text-amber-600" : ""}
                                />
                                <span>{item.name}</span>
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bar;