"use client";
import React, { useState } from "react";
import ProjectHeader from "@/app/dashboard/DailyPlannerMultiplayer/project/ProjectHeader";
import BoardView from "@/components/goalplanner/views/BoardView/page";
import ListView from "@/components/goalplanner/views/ListView/page";
import TimelineView from "@/components/goalplanner/views/TimelineView/page";
import TableView from "@/components/goalplanner/views/TableView/page";

import ModalNewTask from "@/components/goalplanner/ModelNewTask";

type Props = {
  id: string;
};
const Project = ({ id }: Props) => {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;