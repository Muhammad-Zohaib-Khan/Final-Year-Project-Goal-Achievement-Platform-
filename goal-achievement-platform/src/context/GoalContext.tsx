import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Event {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface Habit {
  id: string;
  title: string;
  frequency: string;
  completed: boolean;
  streak: number;
}

interface GoalContextType {
  events: Event[];
  habits: Habit[];
  mood: string;
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
  completeEvent: (id: string) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  completeHabit: (id: string) => void;
  updateMood: (mood: string) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial sample events
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Morning run',
      time: '7:30 AM',
      completed: false
    },
    {
      id: '2',
      title: 'Team meeting',
      time: '9:00 AM',
      completed: false
    },
    {
      id: '3',
      title: 'Lunch with Sarah',
      time: '11:00 AM',
      completed: false
    },
    {
      id: '4',
      title: 'Project deadline',
      time: '1:30 PM',
      completed: false
    }
  ]);
  
  // Initial sample habits
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: '1',
      title: 'Take vitamins',
      frequency: 'Daily',
      completed: true,
      streak: 5
    }
  ]);
  
  const [mood, setMood] = useState('good');
  
  const addEvent = (event: Event) => {
    setEvents([...events, event]);
  };
  
  const updateEvent = (updatedEvent: Event) => {
    setEvents(
      events.map((event) => 
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };
  
  const deleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };
  
  const completeEvent = (id: string) => {
    setEvents(
      events.map((event) => 
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };
  
  const addHabit = (habit: Habit) => {
    setHabits([...habits, habit]);
  };
  
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(
      habits.map((habit) => 
        habit.id === updatedHabit.id ? updatedHabit : habit
      )
    );
  };
  
  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };
  
  const completeHabit = (id: string) => {
    setHabits(
      habits.map((habit) => 
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };
  
  const updateMood = (newMood: string) => {
    setMood(newMood);
  };
  
  return (
    <GoalContext.Provider value={{
      events,
      habits,
      mood,
      addEvent,
      updateEvent,
      deleteEvent,
      completeEvent,
      addHabit,
      updateHabit,
      deleteHabit,
      completeHabit,
      updateMood
    }}>
      {children}
    </GoalContext.Provider>
  );
};

export const useGoalContext = (): GoalContextType => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoalContext must be used within a GoalProvider');
  }
  return context;
};