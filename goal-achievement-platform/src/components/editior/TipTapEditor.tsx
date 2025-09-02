"use client";
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenubar";
import { Button } from "../ui/button";
import { useDebounce } from "@/lib/useDebouncs";
// import { useMutation } from "@tanstack/react-query"; // ⛔️ Backend: Mutation logic (commented)
import Text from "@tiptap/extension-text";
// import axios from "axios"; // ⛔️ Backend: Axios for API call (commented)
// import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Temporary replacement until schema.ts exists
type NoteType = {
  id: string;
  name: string;
  editorState?: string;
};

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = React.useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const [isSaving, setIsSaving] = React.useState(false);

  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  // ✅ stable saveNote
  const saveNote = React.useCallback(() => {
    setIsSaving(true);
    console.log("Simulated save to database with content:", editorState);
    setTimeout(() => setIsSaving(false), 300); // fake async
  }, [editorState]);

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debouncedEditorState = useDebounce(editorState, 500);

  React.useEffect(() => {
    if (debouncedEditorState === "") return;
    saveNote();
  }, [debouncedEditorState, saveNote]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="backdrop-blur-sm bg-white/70 border border-zinc-200 rounded-xl shadow-2xl p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant="outline" className="w-fit text-green-700 border-green-400">
          {isSaving ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="mt-4 prose prose-sm w-full max-w-full">
        <EditorContent editor={editor} />
      </div>

      <div className="h-6" />

      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
        <span>
          Tip: Press{" "}
          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">
            Shift + A
          </kbd>{" "}
          to use AI autocomplete
        </span>
      </div>
    </motion.div>
  );
};

export default TipTapEditor;
