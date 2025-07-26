"use client";

import AnalyticsPanel from "@/components/goalplanner/AnalyticsPanel";
import Header from "@/components/goalplanner/Header";
import { PlusSquare } from "lucide-react";
import React, { useState } from "react";
import ModelNewProject from "@/components/goalplanner/views/ModelNewProject/page";
import { useRouter } from "next/navigation";

type BoardData = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
};

const boards: BoardData[] = [
  { id: "A", name: "Project A", description: "Login system", startDate: "2025-06-01", endDate: "2025-06-30" },
  { id: "B", name: "Project B", description: "DevOps", startDate: "2025-07-01", endDate: "2025-07-15" },
  { id: "C", name: "Project C", description: "Database", startDate: "2025-07-16", endDate: "2025-08-01" },
];

const mockTasksData: Record<string, { id: number; title: string; status: string; priority: string }[]> = {
  A: [
    { id: 1, title: "Design Login Page", status: "To Do", priority: "High" },
    { id: 2, title: "Connect Auth API", status: "In Progress", priority: "Medium" },
  ],
  B: [
    { id: 3, title: "Setup CI/CD", status: "To Do", priority: "Low" },
    { id: 4, title: "Write Tests", status: "In Progress", priority: "High" },
    { id: 5, title: "Deploy", status: "Done", priority: "Medium" },
  ],
  C: [
    { id: 6, title: "DB Schema", status: "Done", priority: "High" },
    { id: 7, title: "Backend APIs", status: "Done", priority: "Medium" },
  ],
};

const ProjectHeader = () => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const router = useRouter();

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/DailyPlannerMultiplayer/project/${id}`);
  };

  return (
    <div className="px-4 xl:px-6 pb-10">
      {/* Modal for Creating New Project */}
      <ModelNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />

      {/* Header Section */}
      <div className="pt-6 pb-4 lg:pt-8">
        <Header
          name="Planning Board"
          buttonComponent={
            <button
              className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" />
              New Board
            </button>
          }
        />
      </div>

      {/* Boards Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm mt-6 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-50 text-xs font-semibold text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-3">Project Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {boards.map((board) => (
              <tr
                key={board.id}
                className="hover:bg-gray-100 cursor-pointer transition"
                onClick={() => handleRowClick(board.id)}
                onMouseEnter={() => setSelectedProjectId(board.id)} // 🟢 Persist selected project
              >
                <td className="px-6 py-4 font-medium text-gray-900">{board.name}</td>
                <td className="px-6 py-4 text-gray-700">{board.description}</td>
                <td className="px-6 py-4 text-gray-500">{board.startDate}</td>
                <td className="px-6 py-4 text-gray-500">{board.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Analytics Panel - Persistent on last hover */}
      {selectedProjectId && mockTasksData[selectedProjectId] && (
        <div className="mt-8">
          <AnalyticsPanel
            projectId={selectedProjectId}
            tasks={mockTasksData[selectedProjectId]}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
