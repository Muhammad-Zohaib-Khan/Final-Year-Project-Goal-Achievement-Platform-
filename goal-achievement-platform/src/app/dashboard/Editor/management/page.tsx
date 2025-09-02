"use client";

import CreateNoteDialog from "@/components/editior/NoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// type Note = {
//   id: string;
//   name: string;
//   imageUrl: string;
//   createdAt: string;
// };

const DashboardPage = () => {
  const notes =[
    {
      id: "1",
      name: "Sample Note",
      imageUrl: "https://images.unsplash.com/photo-1747134392051-5e112c58ce1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5NHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Zohaib",
      imageUrl: "https://images.unsplash.com/photo-1750625991979-a008c832e04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: new Date().toISOString(),
    },
    // Add more dummy notes here if needed
  ];

  // BACKEND REPLACEMENT:
  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     const { userId } = auth(); // Get current user ID
  //     const notes = await db.select().from($notes).where(eq($notes.userId, userId!));
  //     setNotes(notes);
  //   };
  //   fetchNotes();
  // }, []);

  
  return (
    <div className="relative grainy min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Animated shimmer */}
      <div className="absolute inset-0 bg-[url('/shimmer.png')] opacity-10 animate-pulse pointer-events-none" />

      <div className="relative max-w-7xl mx-auto p-6 md:p-10">
        <div className="h-14"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <Link href="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700" size="sm">
                <ArrowLeft className="mr-1 w-4 h-4" />
                Back
              </Button>
            </Link>
            <div className="w-4"></div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <div className="w-4"></div>
            {/* BACKEND: <UserButton /> — Shows authenticated user's profile */}
            <div className="rounded-full w-8 h-8 bg-gray-300"></div>
          </div>
        </div>

        <div className="h-8"></div>
        <Separator />
        <div className="h-8"></div>

        {notes.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <CreateNoteDialog />

          {notes.map((note) => (
            <Link href={`/dashboard/Editor/notebook/${note.id}`} key={note.id}>
              <motion.div
                className="cursor-pointer border border-stone-300 rounded-xl overflow-hidden bg-white shadow-md"
                whileHover={{ rotateY: 10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative w-full h-40 bg-gray-100">
                  {note.imageUrl ? (
                    <Image
                      className="object-cover"
                      fill
                      alt={note.name}
                      src={note.imageUrl}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {note.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;