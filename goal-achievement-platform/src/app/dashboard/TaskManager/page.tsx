"use client";
import React, { useState } from 'react';
import { Plus, Check, Award} from 'lucide-react';
import TaskForm from '@/components/Task_com/Taskform';
import { useTaskContext } from '@/context/TaskContext';

const TaskManager: React.FC = () => {
  const { tasks, completeTask } = useTaskContext();
  const [showTaskForm, setShowTaskForm] = useState(false);
  
  // Filter completed tasks
  const completedTasks = tasks.filter((task) => task.completed);
  const incompleteTasks = tasks.filter((task) => !task.completed);
  
  // Calculate progress
  const progress = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return 'bg-[#3498db]';
      case 'medium':
        return 'bg-[#e67e22]';
      case 'high':
        return 'bg-[#e74c3c]';
      default:
        return 'bg-[#3498db]';
    }
  };
  
  return (
    <div className="w-full h-full bg-black px-4 py-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Task Manager</h1>
        <div className="flex items-center space-x-3 sm:space-x-4">
          <span className="text-[#a9b7c6] text-sm sm:text-base">
            {completedTasks.length} / {tasks.length} completed
          </span>
          <div className="bg-[#fcd34d] text-[#121e2b] px-3 py-1 rounded-full font-medium flex items-center">
            <Award className="mr-1" size={16} />
            <span>250</span>
          </div>
        </div>
      </div>
      
      {/* Add Task Button */}
      <div className="mb-6">
        <button 
          onClick={() => setShowTaskForm(true)}
          className="w-full py-3 sm:py-4 bg-[#243242] hover:bg-[#2d4356] text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          <span className="text-lg sm:text-xl">Add Task</span>
        </button>
      </div>
      
      {/* Task List */}
      <div className="space-y-3 mb-6">
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((task) => (
            <div 
              key={task.id}
              className="bg-[#1e2a3a] rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <span className={`${getPriorityColor(task.priority)} px-2 py-1 rounded-md text-white text-xs sm:text-sm sm:mr-3 sm:w-16 text-center`}>
                  {task.priority}
                </span>
                <span className="text-white text-base sm:text-lg">{task.title}</span>
              </div>
              <button 
                onClick={() => completeTask(task.id)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#3e8ed0] flex items-center justify-center hover:bg-[#3e8ed0] transition-colors flex-shrink-0 ml-2"
              >
                <Check size={16} className="text-[#3e8ed0] group-hover:text-white sm:size-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[#a9b7c6] bg-[#1e2a3a] rounded-lg">
            <p>No tasks yet. Add your first task!</p>
          </div>
        )}
      </div>
      
      {/* Progress Section */}
      <div className="bg-[#1e2a3a] rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Progress</h2>
          <div className="text-lg sm:text-xl font-bold text-white">
            {completedTasks.length} / {tasks.length}
          </div>
        </div>
        <div className="text-[#a9b7c6] text-sm sm:text-base mb-3 sm:mb-4">Daily</div>
        <div className="w-full bg-[#243242] rounded-full h-2 sm:h-3">
          <div 
            className="bg-gradient-to-r from-[#3e8ed0] to-[#48c78e] h-2 sm:h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {showTaskForm && (
        <TaskForm onClose={() => setShowTaskForm(false)} />
      )}
    </div>
  );
};

export default TaskManager;