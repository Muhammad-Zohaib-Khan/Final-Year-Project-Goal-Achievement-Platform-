import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Task {
  id: string;
  title: string;
  priority: string;
  habit?: string;
  frequency?: string;
  completed: boolean;
  createdAt: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial sample tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Buy groceries',
      priority: 'low',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Finish report',
      priority: 'medium',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Call plumber',
      priority: 'high',
      completed: true,
      createdAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Water plants',
      priority: 'low',
      completed: false,
      createdAt: new Date().toISOString()
    }
  ]);
  
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };
  
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const completeTask = (id: string) => {
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      completeTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};