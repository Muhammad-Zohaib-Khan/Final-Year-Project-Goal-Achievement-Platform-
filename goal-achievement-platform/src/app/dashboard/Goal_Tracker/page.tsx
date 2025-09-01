"use client";
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, ArrowUp, CheckCircle, Trophy, Zap, Target } from 'lucide-react';
import GoalForm from '@/components/Goal_com/goal_form';
import { useGoalContext } from '@/context/GoalContext';

const GoalTracker: React.FC = () => {
  const { events, habits, mood, updateMood, completeEvent, completeHabit } = useGoalContext();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  
  const today = new Date();
  const formattedDate = format(today, 'MMMM d');
  
  const activateBoost = () => {
    setBoostActive(true);
    // Boost lasts for 1 hour
    setTimeout(() => setBoostActive(false), 3600000);
  };
  
  const handleEventComplete = (id: string) => {
    completeEvent(id);
    if (boostActive) {
      // Additional XP when boost is active
      // This would integrate with your XP system
    }
  };
  
  const handleHabitComplete = (id: string) => {
    completeHabit(id);
    // Add streak bonus
  };
  
  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateMood(e.target.value);
  };
  
  return (
    <div className="w-screen h-screen bg-black px-4 py-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Goal Tracker</h1>
          <span className="text-xl sm:text-2xl font-normal text-[#a9b7c6]">& Daily Planner</span>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-[#243242] px-4 py-2 rounded-lg justify-center sm:justify-start">
            <Trophy className="text-[#fcd34d] mr-2" size={20} />
            <span className="text-white font-medium">Level 5</span>
          </div>
          <button 
            onClick={() => setShowGoalForm(true)}
            className="py-3 px-4 sm:px-6 bg-[#243242] hover:bg-[#2d4356] text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <Plus size={20} className="mr-2" />
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Planner Section */}
        <div className="lg:col-span-2 bg-[#1e2a3a] rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <h2 className="text-xl font-bold text-white">Daily Planner</h2>
            <span className="text-[#a9b7c6] text-sm sm:text-base">{formattedDate}</span>
          </div>
          
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between py-3 px-4 bg-[#243242] rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center w-full">
                  <div className="w-full sm:w-24 text-[#a9b7c6] mb-1 sm:mb-0 sm:mr-4 text-sm sm:text-base">{event.time}</div>
                  <div className={`text-white text-sm sm:text-base ${event.completed ? 'line-through text-[#a9b7c6]' : ''}`}>
                    {event.title}
                  </div>
                </div>
                <button
                  onClick={() => handleEventComplete(event.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0 ml-2 ${
                    event.completed
                      ? 'bg-[#3e8ed0] border-[#3e8ed0]'
                      : 'border-[#3e8ed0] hover:bg-[#3e8ed0]/20'
                  }`}
                >
                  {event.completed && <CheckCircle size={14} className="text-white" />}
                </button>
              </div>
            ))}
            
            {events.length === 0 && (
              <div className="text-center py-8 text-[#a9b7c6]">
                <p>No events scheduled for today</p>
                <button 
                  onClick={() => setShowGoalForm(true)}
                  className="mt-2 text-[#3e8ed0] hover:underline"
                >
                  Add an event
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar Section */}
        <div className="space-y-6">
          {/* Recurring Tasks */}
          <div className="bg-[#1e2a3a] rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recurring Tasks</h2>
            
            <div className="space-y-3">
              {habits.map((habit) => (
                <div key={habit.id} className="flex items-center justify-between bg-[#243242] p-3 rounded-lg">
                  <div className="flex items-center w-full">
                    <button 
                      onClick={() => handleHabitComplete(habit.id)}
                      className={`w-6 h-6 rounded-full border border-[#3e8ed0] flex items-center justify-center mr-3 flex-shrink-0
                      ${habit.completed ? 'bg-[#3e8ed0]' : 'bg-transparent hover:bg-[#3e8ed0]/20'}`}
                    >
                      {habit.completed && <CheckCircle size={16} className="text-white" />}
                    </button>
                    <div className="w-full">
                      <span className="text-white text-sm sm:text-base">{habit.title}</span>
                      <div className="flex flex-col sm:flex-row sm:items-center mt-1">
                        <span className="text-xs text-[#a9b7c6]">{habit.frequency}</span>
                        {habit.streak > 0 && (
                          <div className="flex items-center sm:ml-2 text-xs text-[#fcd34d] mt-1 sm:mt-0">
                            <Target size={12} className="mr-1" />
                            <span>{habit.streak} day streak</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {habits.length === 0 && (
                <div className="text-center py-4 text-[#a9b7c6]">
                  <p>No recurring tasks yet</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Streak Section */}
          <div className="bg-[#1e2a3a] rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-2">Streak</h2>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#a9b7c6]">5 days</span>
              </div>
              <div className="flex items-center">
                <ArrowUp className="text-[#48c78e] mr-1" size={16} />
                <span className="text-[#48c78e]">20%</span>
              </div>
            </div>
            <div className="mt-4 bg-[#243242] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#a9b7c6] text-sm">Next Milestone</span>
                <span className="text-white text-sm">7 days</span>
              </div>
              <div className="w-full bg-[#1a2b3c] rounded-full h-2">
                <div className="bg-[#3e8ed0] h-2 rounded-full" style={{ width: '71%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Mood Tracker */}
          <div className="bg-[#1e2a3a] rounded-lg p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white mb-4">Mood Tracker</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="mood" className="block text-sm font-medium text-[#a9b7c6] mb-2">
                  Log mood
                </label>
                <select
                  id="mood"
                  value={mood}
                  onChange={handleMoodChange}
                  className="w-full p-3 rounded-md bg-[#243242] text-white border border-[#2d4356] focus:outline-none focus:ring-2 focus:ring-[#3e8ed0] text-sm sm:text-base"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="okay">Okay</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
              
              <div className="bg-[#243242] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a9b7c6] text-sm sm:text-base">Boost</span>
                  <button
                    onClick={activateBoost}
                    disabled={boostActive}
                    className={`flex items-center px-3 py-1 rounded-md transition-colors text-sm sm:text-base ${
                      boostActive
                        ? 'bg-[#3e8ed0] text-white cursor-not-allowed'
                        : 'bg-[#1a2b3c] text-[#3e8ed0] hover:bg-[#2d4356]'
                    }`}
                  >
                    <Zap size={16} className="mr-1" />
                    <span>{boostActive ? 'Active' : '+20%'}</span>
                  </button>
                </div>
                {boostActive && (
                  <div className="w-full bg-[#1a2b3c] rounded-full h-1">
                    <div className="bg-[#3e8ed0] h-1 rounded-full animate-[boost_3600s_linear]"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showGoalForm && (
        <GoalForm onClose={() => setShowGoalForm(false)} />
      )}
    </div>
  );
};

export default GoalTracker;