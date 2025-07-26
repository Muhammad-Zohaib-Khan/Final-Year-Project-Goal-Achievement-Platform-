import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f87171', '#facc15', '#34d399']; // High, Medium, Low
type Task= {
  id: number,
  title: string,
  status: string,
  priority: string,
}
interface Props {
  tasks: Task[];
}

const PieChartComponent = ({ tasks }:Props) => {
  const priorityCount:{[key:string]:number} = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  tasks.forEach(task => {
    priorityCount[task.priority] = (priorityCount[task.priority] || 0) + 1;
  });

  const data = Object.entries(priorityCount).map(([priority, count]) => ({
    name: priority,
    value: count,
  }));

  return (
    <div>
      <h3 className="text-md font-medium text-center mb-2">Task Priority</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;