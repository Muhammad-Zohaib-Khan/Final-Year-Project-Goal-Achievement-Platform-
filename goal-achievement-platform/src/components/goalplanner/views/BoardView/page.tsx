"use client";
import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { EllipsisVertical, Plus, Trash2Icon, Edit } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import ModelUpdateTask from "@/components/goalplanner/ModelUpdateTask";
import { TaskType } from "@/components/goalplanner/ModelUpdateTask";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const teamMembers = [
  { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, name: "Jane Smith", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, name: "Bob Johnson", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, name: "Alice Brown", avatar: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const [taskList, setTaskList] = useState<TaskType[]>([
    {
      id: 1,
      title: "Design landing page",
      description: "Create responsive UI with modern design patterns and ensure cross-browser compatibility",
      status: "To Do",
      priority: "High",
      tags: "design,frontend",
      startDate: "2025-06-20",
      dueDate: "2025-06-25",
      comments: [{ id: 1 }, { id: 2 }],
      assignee: { userId: 1, username: "John Doe", profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg" }
    },
    {
      id: 2,
      title: "Fix login bug",
      description: "Handle token expiration and refresh flow",
      status: "Work In Progress",
      priority: "Urgent",
      tags: "backend,bug",
      startDate: "2025-06-18",
      dueDate: "2025-06-22",
      comments: [{ id: 1 }],
      assignee: { userId: 2, username: "Jane Smith", profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg" }
    },
    {
      id: 3,
      title: "API documentation",
      description: "Write comprehensive documentation for new endpoints",
      status: "Under Review",
      priority: "Medium",
      tags: "documentation,backend",
      startDate: "2025-06-15",
      dueDate: "2025-06-20",
      comments: [],
      assignee: { userId: 3, username: "Bob Johnson", profilePictureUrl: "https://randomuser.me/api/portraits/men/3.jpg" }
    },
    {
      id: 4,
      title: "Database optimization",
      description: "Analyze and optimize slow queries",
      status: "Completed",
      priority: "High",
      tags: "database,performance",
      startDate: "2025-06-10",
      dueDate: "2025-06-15",
      comments: [{ id: 1 }, { id: 2 }, { id: 3 }],
      assignee: { userId: 4, username: "Alice Brown", profilePictureUrl: "https://randomuser.me/api/portraits/women/4.jpg" }
    },
  ]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);

  const moveTask = (taskId: number, toStatus: string) => {
    setTaskList(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: toStatus } : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTaskList(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const updateTask = (updatedTask: TaskType) => {
    setTaskList(prevTasks =>
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setIsUpdateModalOpen(false);
  };

  const handleEditClick = (task: TaskType) => {
    setSelectedTask(task);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <DndProvider backend={HTML5Backend}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {taskStatus.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={taskList}
              moveTask={moveTask}
              setIsModalNewTaskOpen={setIsModalNewTaskOpen}
              onEditClick={handleEditClick}
              onDeleteClick={deleteTask}
            />
          ))}
        </div>
      </DndProvider>

      {selectedTask && (
        <ModelUpdateTask
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          task={selectedTask}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (taskId: number) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
  onEditClick,
  onDeleteClick,
}: TaskColumnProps) => {
  const columnRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => moveTask(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(columnRef);

  const statusColors = {
    "To Do": "bg-blue-100 border-blue-500",
    "Work In Progress": "bg-green-100 border-green-500",
    "Under Review": "bg-amber-100 border-amber-500",
    "Completed": "bg-gray-100 border-gray-500",
  };

  const statusTextColors = {
    "To Do": "text-blue-800",
    "Work In Progress": "text-green-800",
    "Under Review": "text-amber-800",
    "Completed": "text-gray-800",
  };

  const tasksCount = tasks.filter((task) => task.status === status).length;

  return (
    <div
      ref={columnRef}
      className={`rounded-xl border-2 overflow-hidden  ${statusColors[status as keyof typeof statusColors]} ${
        isOver ? "opacity-70" : ""
      } transition-all duration-200`}
    >
      <div className="sticky top-0 z-10 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h3 className={`text-lg font-bold ${statusTextColors[status as keyof typeof statusTextColors]}`}>
              {status}
            </h3>
            <span className="ml-2 rounded-full bg-white px-2.5 py-0.5 text-sm font-medium">
              {tasksCount}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-7">
            <button
              onClick={() => setIsModalNewTaskOpen(true)}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-white hover:text-gray-700"
            >
              <Plus size={18} />
            </button>
            <button className="rounded-lg p-1.5 text-gray-500 hover:bg-white hover:text-gray-700">
              <EllipsisVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
          
        {tasks.filter((task) => task.status === status).length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
            <p className="text-gray-500">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );
};

type TaskProps = {
  task: TaskType;
  onEditClick: (task: TaskType) => void;
  onDeleteClick: (taskId: number) => void;
};

const Task = ({ task, onEditClick, onDeleteClick }: TaskProps) => {
  const taskRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState(task.assignee?.userId || "");

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(taskRef);

  const formattedStart = task.startDate
    ? format(new Date(task.startDate), "MMM d")
    : "";
  const formattedDue = task.dueDate ? format(new Date(task.dueDate), "MMM d") : "";
  const taskTags = task.tags?.split(",") || [];

  const priorityColors:Record<"Low" | "Medium" |"High" | "Urgent"|string, string> = {
    "Low": "bg-blue-100 text-blue-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-orange-100 text-orange-800",
    "Urgent": "bg-red-100 text-red-800",
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const memberId = Number(e.target.value);
    setSelectedMember(memberId);
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      // In a real app, you would update the task's assignee via API here
    }
  };

  return (
    <div
      ref={taskRef}
      className={`transform rounded-xl bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        isDragging ? "opacity-50 shadow-lg" : "opacity-100"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-wrap gap-2">
            {task.priority && (
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            )}
            {taskTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => onEditClick(task)}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onDeleteClick(task.id)}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
            >
              <Trash2Icon size={16} />
            </button>
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-md font-bold text-gray-800">{task.title}</h4>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {task.description}
          </p>
        </div>

        {(formattedStart || formattedDue) && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <svg className="mr-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {formattedStart && `${formattedStart} - `}
            {formattedDue}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <div className="flex items-center">
            <select
              value={selectedMember}
              onChange={handleMemberChange}
              className="rounded-lg border border-gray-200 bg-white py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            
            
            {task.assignee && (
              <div className="ml-3 flex -space-x-2 overflow-hidden">
                <Image
                  src={task.assignee.profilePictureUrl || "https://randomuser.me/api/portraits/men/1.jpg"}
                  alt={task.assignee.username}
                  width={28}
                  height={28}
                  className="inline-block h-7 w-7 rounded-full border-2 border-white object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;