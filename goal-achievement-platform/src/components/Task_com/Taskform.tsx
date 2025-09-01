"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';

interface TaskFormProps {
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onClose }) => {
  const { addTask } = useTaskContext();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('low');
  const [habit, setHabit] = useState('');
  const [frequency, setFrequency] = useState('daily');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') return;
    
    addTask({
      id: Date.now().toString(),
      title,
      priority,
      habit,
      frequency,
      completed: false,
      createdAt: new Date().toISOString()
    });
    
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#1a2b3c] rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-white mb-6">Add New Task</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#a9b7c6] mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
              placeholder="What do you need to do?"
              required
            />
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-[#a9b7c6] mb-1">
              Priority Level
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="habit" className="block text-sm font-medium text-[#a9b7c6] mb-1">
              Related Habit (Optional)
            </label>
            <input
              type="text"
              id="habit"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
              placeholder="e.g., Exercise, Reading, etc."
            />
          </div>
          
          <div>
            <label htmlFor="frequency" className="block text-sm font-medium text-[#a9b7c6] mb-1">
              Frequency
            </label>
            <select
              id="frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
            >
              <option value="once">One time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-[#243242] hover:bg-[#2d4356] text-white font-medium rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-[#3e8ed0] hover:bg-[#3273a8] text-white font-medium rounded-md transition-colors"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;