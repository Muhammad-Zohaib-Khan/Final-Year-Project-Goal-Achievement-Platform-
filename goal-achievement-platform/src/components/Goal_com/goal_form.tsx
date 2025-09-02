"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useGoalContext } from '../../context/GoalContext';

interface GoalFormProps {
  onClose: () => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onClose }) => {
  const { addEvent, addHabit } = useGoalContext();
  const [formType, setFormType] = useState<'event' | 'habit'>('event');
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('daily');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') return;
    
    if (formType === 'event') {
      if (time === '') return;
      
      addEvent({
        id: Date.now().toString(),
        title,
        time,
        completed: false
      });
    } else {
      addHabit({
        id: Date.now().toString(),
        title,
        frequency,
        completed: false,
        streak: 0
      });
    }
    
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
        
        <h2 className="text-2xl font-bold text-white mb-6">Add New {formType === 'event' ? 'Event' : 'Habit'}</h2>
        
        <div className="flex mb-6 border-b border-[#2d4356]">
          <button
            onClick={() => setFormType('event')}
            className={`flex-1 py-2 text-center ${
              formType === 'event' 
                ? 'text-white border-b-2 border-[#3e8ed0]' 
                : 'text-[#a9b7c6] hover:text-white'
            }`}
          >
            Event
          </button>
          <button
            onClick={() => setFormType('habit')}
            className={`flex-1 py-2 text-center ${
              formType === 'habit' 
                ? 'text-white border-b-2 border-[#3e8ed0]' 
                : 'text-[#a9b7c6] hover:text-white'
            }`}
          >
            Habit
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#a9b7c6] mb-1">
              {formType === 'event' ? 'Event Title' : 'Habit Name'}
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
              placeholder={formType === 'event' ? 'e.g., Team Meeting' : 'e.g., Morning Run'}
              required
            />
          </div>
          
          {formType === 'event' ? (
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-[#a9b7c6] mb-1">
                Time
              </label>
              <input
                type="text"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0]"
                placeholder="e.g., 9:00 AM"
                required
              />
            </div>
          ) : (
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
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          )}
          
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
              Save {formType === 'event' ? 'Event' : 'Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalForm;