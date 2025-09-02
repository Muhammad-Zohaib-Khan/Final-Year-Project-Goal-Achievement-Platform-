"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

type Props = {
  noteId: number|string; // Use number or string based on your ID type
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();


  const handleClick = () => {
    const confirmDelete = toast.success(
      "Delete Sucessful"
    );
    if (!confirmDelete) return;

    console.log(`Pretending to delete note with ID: ${noteId}`);
    router.push("/dashboard/Editor/management");

  };

  return (
    <Button
      variant={"destructive"}
      size="sm"
      onClick={handleClick}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;