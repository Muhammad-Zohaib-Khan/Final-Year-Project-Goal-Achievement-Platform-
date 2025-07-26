"use client";
import { Editor } from "@tiptap/react"; // Editor instance comes from TipTap

// Icons from lucide-react for formatting buttons
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import { motion } from "framer-motion";

// Pure frontend formatting toolbar for TipTap editor
const TipTapMenuBar = ({ editor }: { editor: Editor }) => {
  // Ensure the editor instance exists
  if (!editor) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-wrap gap-3 p-4 bg-gradient-to-r from-white via-gray-50 to-white border border-zinc-200 rounded-xl shadow-sm backdrop-blur-md"
    >
      {/* Toggle Bold */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn ${editor.isActive("bold") ? "active" : ""}`}
      >
        <Bold className="w-5 h-5" />
      </button>

      {/* Toggle Italic */}
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn ${editor.isActive("italic") ? "active" : ""}`}
      >
        <Italic className="w-5 h-5" />
      </button>

      {/* Toggle Strikethrough */}
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn ${editor.isActive("strike") ? "active" : ""}`}
      >
        <Strikethrough className="w-5 h-5" />
      </button>

      {/* Toggle Inline Code */}
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`editor-btn ${editor.isActive("code") ? "active" : ""}`}
      >
        <Code className="w-5 h-5" />
      </button>

      {/* Toggle Heading Levels */}
      {[1, 2, 3, 4, 5, 6].map((level) => {
        const HeadingIcon = [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][level - 1];
        return (
          <button
            key={level}
            onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
            className={`editor-btn ${editor.isActive("heading", { level }) ? "active" : ""}`}
          >
            <HeadingIcon className="w-5 h-5" />
          </button>
        );
      })}

      {/* Toggle Bullet List */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`editor-btn ${editor.isActive("bulletList") ? "active" : ""}`}
      >
        <List className="w-5 h-5" />
      </button>

      {/* Toggle Ordered List */}
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`editor-btn ${editor.isActive("orderedList") ? "active" : ""}`}
      >
        <ListOrdered className="w-5 h-5" />
      </button>

      {/* Toggle Code Block */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`editor-btn ${editor.isActive("codeBlock") ? "active" : ""}`}
      >
        <CodepenIcon className="w-5 h-5" />
      </button>

      {/* Toggle Blockquote */}
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`editor-btn ${editor.isActive("blockquote") ? "active" : ""}`}
      >
        <Quote className="w-5 h-5" />
      </button>

      {/* Undo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="editor-btn"
      >
        <Undo className="w-5 h-5" />
      </button>

      {/* Redo */}
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="editor-btn"
      >
        <Redo className="w-5 h-5" />
      </button>
    </motion.div>
  );
};

export default TipTapMenuBar;