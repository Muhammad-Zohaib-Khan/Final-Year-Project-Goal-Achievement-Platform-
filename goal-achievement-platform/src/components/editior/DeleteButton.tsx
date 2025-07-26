"use client";

import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
// BACKEND IMPORTS (commented out)
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { useRouter } from "next/navigation";

type Props = {
  noteId: number|string; // Use number or string based on your ID type
};

const DeleteButton = ({ noteId }: Props) => {
  const router = useRouter();

  // BACKEND MUTATION (disabled for frontend only)
  // const deleteNote = useMutation({
  //   mutationFn: async () => {
  //     const response = await axios.post("/api/deleteNote", { noteId });
  //     return response.data;
  //   },
  // });

  const handleClick = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    // FRONTEND MOCK BEHAVIOR (simulate success)
    // In production, replace this with deleteNote.mutate(...)
    console.log(`Pretending to delete note with ID: ${noteId}`);
    router.push("/dashboard");

    // If using mutation:
    /*
    deleteNote.mutate(undefined, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (err) => {
        console.error(err);
      },
    });
    */
  };

  return (
    <Button
      variant={"destructive"}
      size="sm"
      // disabled={deleteNote.isLoading} // <-- BACKEND LOADING STATE
      onClick={handleClick}
    >
      <Trash />
    </Button>
  );
};

export default DeleteButton;