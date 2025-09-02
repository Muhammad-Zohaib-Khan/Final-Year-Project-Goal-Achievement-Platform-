"use client";
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { 
  Anchor, 
  CheckSquare, 
  Target, 
  BarChart,
  Award,
  Trophy,
  Zap,
  Star,
  ArrowDown,
  Gauge,
  AlertTriangle
} from 'lucide-react';


interface Xrops {
  user: any;
  onLogout: () => void;   // ✅ added this
}
interface Props {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  // ...other props
}
const Dashboard: React.FC<Xrops> = ({ user, onLogout }) => {
  const [depth, setDepth] = useState(150);
  const [oxygenLevel, setOxygenLevel] = useState(85);
  const [isDescending, setIsDescending] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const maxDepth = 200;
  const criticalDepth = 180;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDepth(currentDepth => {
        if (isDescending) {
          const newDepth = currentDepth + 1;
          if (newDepth >= maxDepth) {
            setIsDescending(false);
            return maxDepth;
          }
          return newDepth;
        } else {
          const newDepth = currentDepth - 1;
          if (newDepth <= 0) {
            setIsDescending(true);
            return 0;
          }
          return newDepth;
        }
      });
      
      setOxygenLevel(current => {
        const variation = Math.random() * 2 - 1;
        const newLevel = current + variation;
        return Math.min(Math.max(newLevel, 70), 100);
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isDescending]);
  
  const getDepthStatus = () => {
    if (depth >= criticalDepth) return 'Critical';
    if (depth >= criticalDepth * 0.8) return 'Warning';
    return 'Safe';
  };
  
  const getDepthStatusColor = () => {
    switch (getDepthStatus()) {
      case 'Critical':
        return 'text-[#f14668]';
      case 'Warning':
        return 'text-[#ffe08a]';
      default:
        return 'text-[#48c78e]';
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} user={user} onLogout={onLogout} /> */}
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-white">General</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-[#243242] px-4 py-2 rounded-lg">
                  <Trophy className="text-[#fcd34d] mr-2" size={20} />
                  <span className="text-white font-medium">Level 5</span>
                </div>
                <div className="flex items-center bg-[#243242] px-4 py-2 rounded-lg">
                  <Star className="text-[#3e8ed0] mr-2" size={20} />
                  <span className="text-white font-medium">2,450 XP</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e2a3a] p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Submarine Depth</h2>
                  <p className="text-[#a9b7c6] mt-1">Current Mission: Deep Sea Exploration</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#243242] px-4 py-2 rounded-lg flex items-center">
                    <Gauge className="text-[#3e8ed0] mr-2" size={20} />
                    <span className="text-white">{Math.round(oxygenLevel)}% Oxygen</span>
                  </div>
                  <div className={`px-3 py-1 rounded-md text-sm flex items-center ${
                    getDepthStatus() === 'Critical' ? 'depth-alert' : ''
                  } ${getDepthStatusColor()}`}>
                    {getDepthStatus() === 'Critical' && (
                      <AlertTriangle size={16} className="mr-1" />
                    )}
                    <span>{getDepthStatus()}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-[#243242] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <ArrowDown className="text-[#3e8ed0] mr-2" size={20} />
                      <span className="text-[#a9b7c6]">Current Depth</span>
                    </div>
                    <span className="text-white font-medium">{depth}m</span>
                  </div>
                  <div className="w-full bg-[#1a2b3c] rounded-full h-2.5 mb-2">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        depth >= criticalDepth 
                          ? 'bg-[#f14668]' 
                          : depth >= criticalDepth * 0.8 
                            ? 'bg-[#ffe08a]' 
                            : 'bg-[#3e8ed0]'
                      }`}
                      style={{ width: `${(depth / maxDepth) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#a9b7c6]">
                    <span>0m</span>
                    <span>{maxDepth}m</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-[#1a2b3c] p-2 rounded-lg text-center">
                      <div className="text-[#3e8ed0] text-sm">Max Depth</div>
                      <div className="text-white font-medium">180m</div>
                    </div>
                    <div className="bg-[#1a2b3c] p-2 rounded-lg text-center">
                      <div className="text-[#3e8ed0] text-sm">Time at Depth</div>
                      <div className="text-white font-medium">45min</div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-2 bg-[#243242] p-4 rounded-lg relative">
                  <div className="rounded-lg overflow-hidden">
                    <div className="relative">
                      <img 
                        src="https://images.pexels.com/photos/3894467/pexels-photo-3894467.jpeg"
                        alt="Submarine"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b3c] to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">Mission Progress</div>
                            <div className="text-[#a9b7c6] text-sm">75% Complete</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="bg-[#48c78e] bg-opacity-20 px-3 py-1 rounded-full">
                              <span className="text-[#ffffff] text-sm">+125 XP</span>
                            </div>
                            <div className="bg-[#fcd34d] bg-opacity-20 px-3 py-1 rounded-full">
                              <span className="text-[#ffffff] text-sm">Level 3</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div className="bg-[#1e2a3a] p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Task Summary</h2>
              
              <div className="space-y-4">
                <div className="bg-[#243242] p-3 rounded-lg">
                  <div className="mb-2">
                    <span className="text-[#a9b7c6]">Archiving to Primitive Ocean</span>
                  </div>
                  <div className="w-full bg-[#1a2b3c] rounded-full h-2.5 mb-2">
                    <div className="bg-[#e67e22] h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#243242] p-3 rounded-lg flex items-center">
                    <div className="bg-[#3e8ed0] bg-opacity-20 p-2 rounded-md mr-3">
                      <CheckSquare size={20} />
                    </div>
                    <div>
                      <span className="text-sm text-[#a9b7c6]">Warning Guidelines</span>
                    </div>
                  </div>
                  <div className="bg-[#243242] p-3 rounded-lg flex items-center">
                    <div className="bg-[#3e8ed0] bg-opacity-20 p-2 rounded-md mr-3">
                      <Anchor size={20} />
                    </div>
                    <div>
                      <span className="text-sm text-[#a9b7c6]">Depth World</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e2a3a] p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Gamification Snippets</h2>
              
              <div className="space-y-4">
                <div className="bg-[#243242] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">XP Progress</h3>
                    <Zap className="text-[#fcd34d]" size={20} />
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div className="text-xs text-[#a9b7c6]">Next Level</div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[#3e8ed0]">550 XP</span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-[#1a2b3c] rounded-full">
                      <div 
                        style={{ width: "65%" }}
                        className="flex flex-col justify-center text-center whitespace-nowrap text-white bg-gradient-to-r from-[#3e8ed0] to-[#e67e22] shadow-none"
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#a9b7c6]">Current: 2,450</span>
                    <span className="text-[#a9b7c6]">Goal: 3,000</span>
                  </div>
                </div>
                
                <div className="bg-[#243242] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Achievements</h3>
                    <Trophy className="text-[#fcd34d]" size={20} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#a9b7c6]">Tasks Completed</span>
                      <div className="flex items-center">
                        <Award className="text-[#3e8ed0] mr-1" size={14} />
                        <span className="text-xs text-white">15/20</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#a9b7c6]">Daily Streak</span>
                      <div className="flex items-center">
                        <Target className="text-[#e67e22] mr-1" size={14} />
                        <span className="text-xs text-white">5 days</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#a9b7c6]">Notes Created</span>
                      <div className="flex items-center">
                        <Star className="text-[#48c78e] mr-1" size={14} />
                        <span className="text-xs text-white">3 this week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1e2a3a] p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-white mb-4">CinePlay Game</h2>
              
              <div className="bg-[#243242] p-4 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#a9b7c6]">PictureQuiz</span>
                  <button className="p-1 bg-[#1a2b3c] rounded-md">
                    <BarChart className="text-[#3e8ed0]" size={16} />
                  </button>
                </div>
                
                <div className="flex items-center justify-center my-6">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-white">270.50</span>
                    <span className="text-[#a9b7c6] text-sm">Score Points</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .depth-alert {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        .bubble {
          position: absolute;
          background-color: rgba(62, 142, 208, 0.5);
          border-radius: 50%;
          animation: rise 5s infinite ease-in;
        }
        
        .bubble-1 {
          width: 10px;
          height: 10px;
          animation-delay: 0s;
        }
        
        .bubble-2 {
          width: 15px;
          height: 15px;
          animation-delay: 1s;
        }
        
        .bubble-3 {
          width: 8px;
          height: 8px;
          animation-delay: 2s;
        }
        
        @keyframes rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;