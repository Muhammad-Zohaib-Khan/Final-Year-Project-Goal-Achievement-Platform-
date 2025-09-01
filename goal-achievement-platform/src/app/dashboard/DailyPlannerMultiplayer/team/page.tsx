"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/goalplanner/Header";
import { teams } from "@/data/teams";
import { dataGridClassNames } from "@/lib/utils";

// Define the User type
type User = {
  id: number | string;
  name: string;
  email: string;
  role: string;
};

// Define the TeamRow type
type TeamRow = {
  id: number | string;
  teamName: string;
  Leader?: string;
  users?: User[]; // Add users to the team row
};

// Mock user data - replace with your actual data source
const mockUsers: Record<string, User[]> = {
  "1": [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
  ],
  "2": [
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Manager" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Analyst" },
  ],
  // Add more teams and users as needed
};

const columns: GridColDef<TeamRow>[] = [
  { field: "id", headerName: "Team ID", width: 140 },
  { field: "teamName", headerName: "Team Name", width: 260, flex: 1 },
  { field: "Leader", headerName: "Team Lead", width: 260, flex: 1 },
];

// User columns for the user grid
const userColumns: GridColDef<User>[] = [
  { field: "id", headerName: "User ID", width: 100 },
  { field: "name", headerName: "Name", width: 200, flex: 1 },
  { field: "email", headerName: "Email", width: 250 },
  { field: "role", headerName: "Role", width: 150 },
];

const TeamPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<string | null>(null);
  const [showUsers, setShowUsers] = React.useState(false);
  const [teamUsers, setTeamUsers] = React.useState<User[]>([]);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (selectedTeam) {
      // Instead of navigating, show users for the selected team
      const users = mockUsers[selectedTeam] || [];
      setTeamUsers(users);
      setShowUsers(true);
    }
  }, [selectedTeam]);

  const handleBackToTeams = () => {
    setShowUsers(false);
    setSelectedTeam(null);
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50">
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-4 text-gray-600 shadow-sm">
          Loading teams…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-6 md:p-10">
      {/* Grid page layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6">
        <Header name={showUsers ? "Team Users" : "Teams"} />

        {showUsers ? (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-4 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Users in Team {selectedTeam}
                </h2>
                <button
                  onClick={handleBackToTeams}
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Back to Teams
                </button>
              </div>

              <div className="h-[600px] w-full overflow-hidden rounded-xl">
                <DataGrid
                  rows={teamUsers}
                  columns={userColumns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableRowSelectionOnClick
                  density="comfortable"
                  className={dataGridClassNames}
                  rowHeight={60}
                  sx={{
                    border: 0,
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: 600,
                    },
                    "& .MuiDataGrid-cell": {
                      alignItems: "center",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      overflowX: "hidden",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "1px solid #e5e7eb",
                      backgroundColor: "#fafafa",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-1 gap-4 p-6">
              <h2 className="text-2xl font-semibold text-blue-600">
                Team Management
              </h2>

              <div className="h-[600px] w-full overflow-hidden rounded-xl">
                <DataGrid
                  rows={teams as TeamRow[]}
                  columns={columns}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                  disableRowSelectionOnClick
                  density="comfortable"
                  className={dataGridClassNames}
                  onRowClick={(params) => setSelectedTeam(String(params.row.id))}
                  rowHeight={60}
                  sx={{
                    border: 0,
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: "#f9fafb",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: 600,
                    },
                    "& .MuiDataGrid-cell": {
                      alignItems: "center",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      overflowX: "hidden",
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "1px solid #e5e7eb",
                      backgroundColor: "#fafafa",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamPage;