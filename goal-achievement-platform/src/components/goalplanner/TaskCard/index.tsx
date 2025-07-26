// ✅ Frontend: UI Component imports
// ⛔️ Backend type import (Commented with explanation)
// import { Task } from "@/state/api"; // This is a backend-shared type; consider mocking or defining it in frontend scope if working without backend

import { format } from "date-fns";
import Image from "next/image";
import React from "react";

// ✅ Frontend: Define your own mock Task type to use without backend
type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: string;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  // ⛔️ Backend-dependent nested objects
  attachments?: {
    fileURL: string;
    fileName: string;
  }[];
  author?: {
    username: string;
  };
  assignee?: {
    username: string;
  };
};

// ✅ Frontend: Props type
type Props = {
  task: Task;
};

// ✅ Frontend: React component
const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {/* ✅ Frontend: Attachments (uses Next.js Image component) */}
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Attachments:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL||" "}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}

      {/* ✅ Frontend: Task information rendering */}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "No tags"}
      </p>
      <p>
        <strong>Start Date:</strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>

      {/* ⛔️ Backend-dependent nested object access */}
      <p>
        <strong>Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;