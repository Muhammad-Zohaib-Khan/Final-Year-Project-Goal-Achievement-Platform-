"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from 'react-hot-toast';

// BACKEND (commented out):
// import axios from "axios";                         // <-- For making backend API requests
// import { useMutation } from "@tanstack/react-query"; // <-- Used for handling async backend mutations
// import { useRouter } from "next/navigation";        // <-- For programmatic navigation after note creation



const CreateNoteDialog = () => {
  const [input, setInput] = React.useState("");

  // BACKEND: Normally you'd call an API and upload data using this
  // const router = useRouter();
  // const uploadToFirebase = useMutation({
  //   mutationFn: async (noteId: string) => {
  //     const response = await axios.post("/api/uploadToFirebase", { noteId });
  //     return response.data;
  //   },
  // });
  //
  // const createNotebook = useMutation({
  //   mutationFn: async () => {
  //     const response = await axios.post("/api/createNoteBook", { name: input });
  //     return response.data;
  //   },
  // });

  // TEMP: Frontend-only handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      toast.error("Please enter a name for your notebook");
      //window.alert("Please enter a name for your notebook");
      return;
    }

    // BACKEND CALLS HERE (currently disabled)
    // createNotebook.mutate(undefined, {
    //   onSuccess: ({ note_id }) => {
    //     console.log("created new note:", { note_id });
    //     uploadToFirebase.mutate(note_id);
    //     router.push(`/notebook/${note_id}`);
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //     window.alert("Failed to create new notebook");
    //   },
    // });

    // FRONTEND ONLY ACTION
    console.log("Notebook name:", input);
    toast.success(`Notebook "${input}" created Successfully.`);
    //alert(`Notebook "${input}" created (mock only).`);
    setInput("");
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600"
              // disabled={createNotebook.isLoading} // <-- BACKEND state
            >
              {/* BACKEND Loading Spinner */}
              {/* {createNotebook.isLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )} */}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;