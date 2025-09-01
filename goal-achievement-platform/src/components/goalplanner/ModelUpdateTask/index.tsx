"use client";
import Modal from "@/components/goalplanner/Model";
import React, { useState, useEffect } from "react";
import { formatISO } from "date-fns";



export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority?: "Low"|"High"|"Medium"|"Urgent"|string;
  tags?: string;
  points?: number;
  startDate?: string;
  dueDate?: string;
  comments?: { id: number }[];
  attachments?: { fileURL: string; fileName: string }[];
  assignee?: { userId: number; username: string; profilePictureUrl?: string };
  author?: { userId: number; username: string; profilePictureUrl?: string };
};

// ✅ Mock enums to replace backend types
enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}


export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: TaskType | null;
  onUpdate: (updatedTask: TaskType) => void;
};

const ModelUpdateTask = ({ isOpen, onClose, task, onUpdate }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setStatus(task.status as Status);
      setPriority((task.priority as Priority) || Priority.Backlog);
      setTags(task.tags || "");
      setStartDate(task.startDate || "");
      setDueDate(task.dueDate || "");
      setAssignedUserId(task.assignee?.userId.toString() || "");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task) return;

    const formattedStartDate = startDate 
      ? formatISO(new Date(startDate), { representation: "complete" })
      : "";
    const formattedDueDate = dueDate 
      ? formatISO(new Date(dueDate), { representation: "complete" })
      : "";

    const updatedTask: TaskType = {
      ...task,
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      assignee: assignedUserId 
        ? { 
            userId: parseInt(assignedUserId), 
            username: "", // Will need to fetch this from backend
            profilePictureUrl: "" 
          } 
        : undefined,
    };

    // 🟡 Backend integration: Replace with actual update API call
    // Example with fetch:
    /*
    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
      
      if (!response.ok) throw new Error('Update failed');
      const data = await response.json();
      onUpdate(data);
    } catch (error) {
      console.error('Error updating task:', error);
    }
    */

    // ✅ For frontend preview
    console.log("Task Updated:", updatedTask);
    onUpdate(updatedTask);
    onClose();
  };

  const selectStyles = "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";
  const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Update Task">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          className={inputStyles}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) => setStatus(e.target.value as Status)}
            required
          >
            {Object.values(Status).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            {Object.values(Priority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Assigned User ID"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        <button
          type="submit"
          className="mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Update Task
        </button>
      </form>
    </Modal>
  );
};

export default ModelUpdateTask;