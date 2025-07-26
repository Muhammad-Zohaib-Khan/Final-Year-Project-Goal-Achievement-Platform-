"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/goalplanner/Header";
import { teams } from "@/data/teams";
import { dataGridClassNames } from "@/lib/utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 200 },
  { field: "Leader", headerName: "Team Lead", width: 200 },
];

const TeamPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 sm:p-6 md:p-8">
      <Header name="Teams" />
      <div className="mx-auto mt-6 w-full max-w-6xl rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold text-blue-600">Team Management Table</h2>
        <div className="h-[650px] w-full overflow-auto rounded-lg border border-gray-300">
          <DataGrid
            rows={teams}
            columns={columns}
            pageSizeOptions={[5]}
            pagination
            className={dataGridClassNames}
            onRowClick={(params) => {
              router.push(`/dashboard/DailyPlannerMultiplayer/team/${params.row.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamPage;