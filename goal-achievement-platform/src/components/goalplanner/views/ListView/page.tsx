"use client";

// ✅ Frontend imports
import Header from "@/components/goalplanner/Header";
import TaskCard from "@/components/goalplanner/TaskCard"; // Make sure TaskCard supports styling externally
import React from "react";

// ⛔️ Backend-related API and type import (enable when ready)
// import { Task, useGetTasksQuery } from "@/state/api";

type Props = {
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

// ✅ Mock Task type (🟡 Replace with real Task type from backend)
type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  attachments?: {
    fileURL: string;
    fileName: string;
  }[];
  author?: {
    username: string;
  };
  assignee?: {
    username: string;
  };
};

// ✅ Mock task data (🟡 Replace with real API call)
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Design the Login Page",
    description: "Build a responsive login form using Tailwind CSS.",
    status: "To Do",
    priority: "High",
    startDate: "2025-06-21",
    dueDate: "2025-06-30",
  },
  {
    id: 2,
    title: "Connect Auth API",
    description: "Link frontend with the backend authentication service.",
    status: "In Progress",
    priority: "Medium",
    startDate: "2025-06-15",
    dueDate: "2025-06-28",
  },
];

const ListView = ({ setIsModalNewTaskOpen }: Props) => {
  // 🟡 BACKEND: Replace below with actual API call
  // const { data: tasks, error, isLoading } = useGetTasksQuery({ projectId: Number(id) });

  const tasks = mockTasks;

  return (
    <div className="px-4 pb-8 xl:px-6">
      {/* ✅ Header section with create button */}
      <div className="pt-5">
        <Header
          name="List View"
          isSmallText
          buttonComponent={
            <button
              className="flex items-center gap-1 rounded bg-blue-primary px-3 py-2 text-sm font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-500"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              + Add Task
            </button>
          }
        />
      </div>

      {/* ✅ Responsive task grid with hover animation */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {tasks?.map((task: Task) => (
          <div
            key={task.id}
            className="transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg"
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListView;