import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Task ={
  id: number,
  title: string,
  status: string,
  priority: string,
};

interface Props {
  tasks: Task[];
}
const BarChartComponent = ({ tasks }:Props) => {
  const statusCount:{[key:string]:number} = {
    'To Do': 0,
    'In Progress': 0,
    'Done': 0,
  };

  tasks.forEach((task:Task) => {
    statusCount[task.status] = (statusCount[task.status] || 0) + 1;
  });

  const data = Object.entries(statusCount).map(([status, count]) => ({
    name: status,
    tasks: count,
  }));

  return (
    <div>
      <h3 className="text-md font-medium text-center mb-2">Task Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;