'use client';

import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type TaskTypeItems = "task" | "milestone" | "project";

type Task = {
  id: number;
  title: string;
  startDate: string;
  dueDate: string;
  points?: number;
};

const Timeline = ({ id, setIsModalNewTaskOpen }: Props) => {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Frontend UI Setup",
      startDate: "2025-06-20",
      dueDate: "2025-06-25",
      points: 5,
    },
    {
      id: 2,
      title: "API Integration",
      startDate: "2025-06-26",
      dueDate: "2025-06-30",
      points: 7,
    },
  ];

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      tasks?.map((task) => ({
        start: new Date(task.startDate),
        end: new Date(task.dueDate),
        name: task.title,
        id: `Task-${task.id}`,
        type: "task" as TaskTypeItems,
        progress: task.points ? (task.points / 10) * 100 : 0,
        isDisabled: false,
      })) || []
    );
  }, [tasks]);

  const handleViewModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          📅 Project Timeline
        </h1>
        <div className="w-full sm:w-64">
          <label className="mb-1 block text-sm font-medium text-gray-600 dark:text-gray-300">
            View Mode
          </label>
          <select
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </div>

      <div className="rounded-lg bg-white dark:bg-gray-800 shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="140px"
            barBackgroundColor="#4B82F7"
            barBackgroundSelectedColor="#2563EB"
          />
        </div>
        <div className="flex justify-end px-4 py-4 border-t bg-gray-50 dark:bg-gray-700">
          <button
            onClick={() => setIsModalNewTaskOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            ➕ Add New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;