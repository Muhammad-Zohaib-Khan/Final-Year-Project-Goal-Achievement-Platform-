"use client";

import DeleteButton from "@/components/editior/DeleteButton";
import TipTapEditor from "@/components/editior/TipTapEditor";
import { Button } from "@/components/ui/button";

import Link from "next/link";

type Props = {
  params: {
    noteId:string|number;
  };
};

// Dummy note and user data (Frontend Only)
const mockNote = {
  id: "2",
  name: "Demo Note",
  imageUrl: "https://via.placeholder.com/400x200",
  createdAt: new Date().toISOString(),
  content: "<p>This is a mock note. Replace with real data later.</p>",
};

const mockUser = {
  firstName: "John",
  lastName: "Doe",
};

const NotebookPage = ({ params: { noteId } }: Props) => {
  // BACKEND (commented out):
  // const { userId } = await auth();
  // if (!userId) return redirect("/dashboard");
  // const user = await clerk.users.getUser(userId);
  // const notes = await db
  //   .select()
  //   .from($notes)
  //   .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));
  // if (notes.length != 1) return redirect("/dashboard");
  // const note = notes[0];

  // FRONTEND MOCK LOGIC:
  const note = mockNote;
  const user = mockUser;

  return (
    <div className="min-h-screen grainy p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard/Editor/management">
            <Button className="bg-green-600" size="sm">
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>

          <div className="ml-auto">
            {/* You can disable the delete button if it's backend-dependent */}
            <DeleteButton noteId={note.id}/>
          </div>
        </div>

        <div className="h-4"></div>

        {/* Editor */}
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;