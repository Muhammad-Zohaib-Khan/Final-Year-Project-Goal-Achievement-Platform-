"use client";

import React from "react";
import { useParams } from "next/navigation";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import Header from "@/components/goalplanner/Header";
import { users } from "@/data/users";
import { teams } from "@/data/teams";
import { dataGridClassNames } from "@/lib/utils";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <Image
        src="/default-avatar.jpg" // Replace with actual static path if needed
        alt={params.row.username}
        width={40}
        height={40}
        className="rounded-full object-cover"
      />
    ),
  },
  { field: "TeamName", headerName: "Team", width: 150 },
];

const TeamDetails = () => {
  const { teamId } = useParams();
  const team = teams.find((t) => t.id.toString() === teamId);
  const teamUsers = users.filter((user) => user.TeamName === team?.teamName);

  if (!team) return <div className="p-8 text-red-500">Team not found</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name={`Users in ${team.teamName}`} />
      <div className="h-[650px] w-full overflow-auto rounded-lg border border-gray-300 bg-white p-4 shadow">
        <DataGrid
          rows={teamUsers}
          columns={columns}
          getRowId={(row) => row.userId}
          pagination
          className={dataGridClassNames}
        />
      </div>
    </div>
  );
};

export default TeamDetails;