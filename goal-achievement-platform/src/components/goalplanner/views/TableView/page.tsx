'use client';

import Header from "@/components/goalplanner/Header";
import { dataGridClassNames } from "@/lib/utils";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  author?: string;
  assignee?: string;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 150 },
  { field: "description", headerName: "Description", width: 250 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 100,
    renderCell: (params) => (
      <span className="text-sm font-medium text-gray-700">{params.value}</span>
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
    renderCell: (params) => (
      <span className="inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
        {params.value}
      </span>
    ),
  },
  { field: "startDate", headerName: "Start Date", width: 120 },
  { field: "dueDate", headerName: "Due Date", width: 120 },
  {
    field: "author",
    headerName: "Author",
    width: 140,
    renderCell: (params) => params.value || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 140,
    renderCell: (params) => params.value || "Unassigned",
  },
];

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Sample Task 1",
    description: "Test description",
    status: "To Do",
    priority: "High",
    tags: "frontend",
    startDate: "2025-06-20",
    dueDate: "2025-06-25",
    author: "Alice",
    assignee: "Bob",
  },
  {
    id: 2,
    title: "Sample Task 2",
    description: "Another test task",
    status: "In Progress",
    priority: "Medium",
    tags: "backend",
    startDate: "2025-06-15",
    dueDate: "2025-06-30",
    author: "Charlie",
    assignee: "Dana",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const tasks = mockTasks;

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Header
          name="📊 Table View"
          isSmallText
          buttonComponent={
            <button
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              ➕ Add Task
            </button>
          }
        />
      </div>

      {/* Data Grid */}
      <div className="w-full rounded-md bg-white shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
        <div className="h-[520px] w-full overflow-hidden">
          <DataGrid
            rows={tasks}
            columns={columns}
            className={`${dataGridClassNames} dark:text-white dark:border-gray-700`}
            pageSizeOptions={[5, 10]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F9FAFB",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-cell": {
                py: 1,
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#F3F4F6",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TableView;