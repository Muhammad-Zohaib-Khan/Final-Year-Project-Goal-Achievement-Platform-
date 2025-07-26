import React from 'react';
import BarChartComponent from '../BarChart';
import PieChartComponent from '../PieChart';

type Task = {
  id: number;
  title: string;
  status: string;
  priority: string;
};

interface Props {
  projectId: string;
  tasks: Task[];
}

export default function AnalyticsPanel({ projectId, tasks }: Props) {
  return (
    <div className="mt-6 p-4 border rounded-lg shadow-md bg-white w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Analytics for Project {projectId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarChartComponent tasks={tasks} />
        <PieChartComponent tasks={tasks} />
      </div>
    </div>
  );
}
