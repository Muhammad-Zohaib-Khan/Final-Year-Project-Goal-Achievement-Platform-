"use client";

import { ProductProvider } from "@/context/ContextProvidrer";
import { GoalProvider } from "@/context/GoalContext";
import { TaskProvider } from "@/context/TaskContext";
import { SidebarProvider } from "@/components/ui/sidebar";

import Bar from "@/lib/AppSidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductProvider>
      <GoalProvider>
        <TaskProvider>
          <SidebarProvider>
            <Bar />
            <main className="w-full">{children}</main>
          </SidebarProvider>
        </TaskProvider>
      </GoalProvider>
    </ProductProvider>
  );
}
