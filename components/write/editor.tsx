"use client";

import React, { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  Quote,
  Heading2,
  Heading3,
  Undo,
  Redo,
  ImageIcon,
  ListOrdered,
  Loader2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { storyService } from "@/services/story";
import { UploadImageRequest } from "@/services/story/types";
import ImageCropper from "../shared/image-cropper";

const MenuBar = ({ editor }: { editor: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const uploadImage = useMutation({
    mutationFn: (data: UploadImageRequest) => storyService.uploadImage(data),
    onSuccess: (data) => {
      editor.chain().focus().setImage({ src: data.url }).run();
      setTempImage(null);
    },
  });

  if (!editor) return null;

  const handleImageClick = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTempImage(reader.result as string);
      reader.readAsDataURL(file);
      e.target.value = "";
    }
  };

  const buttons = [
    {
      label: "H2",
      icon: <Heading2 size={18} />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "H3",
      icon: <Heading3 size={18} />,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      label: "Bold",
      icon: <Bold size={18} />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: <Italic size={18} />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      label: "Underline",
      icon: <UnderlineIcon size={18} />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      label: "List",
      icon: <List size={18} />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered size={16} />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
    {
      label: "Quote",
      icon: <Quote size={18} />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
    {
      label: "Image",
      icon: uploadImage.isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <ImageIcon size={18} />
      ),
      action: handleImageClick,
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 p-3 border-b border-border bg-foreground/[0.02] sticky top-0 z-20">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {tempImage && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-background border border-border p-8 pb-4 rounded-[2.5rem] shadow-2xl max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-serif font-bold text-xl">Crop Image</h2>
              <button
                onClick={() => setTempImage(null)}
                className="text-foreground/40 hover:text-foreground font-bold"
              >
                Cancel
              </button>
            </div>
            {uploadImage.isPending ? (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-[2.5rem]">
                <Loader2
                  className="animate-spin text-accent-primary"
                  size={40}
                />
              </div>
            ) : (
              <ImageCropper src={tempImage} onCrop={(file) => setFile(file)} />
            )}
            <div className="flex justify-end items-center mt-2">
              <button
                onClick={() => {
                  if (!file) return;
                  uploadImage.mutate({ image: file });
                }}
                className="w-full sm:w-auto p-3 bg-accent-primary text-white rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-accent-primary/20 hover:bg-accent-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group disabled:bg-accent-primary/50"
                disabled={uploadImage.isPending}
              >
                <span>Apply Changes</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse group-hover:scale-125 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
      {buttons.map((btn, i) => (
        <button
          key={i}
          type="button"
          onClick={btn.action}
          className={cn(
            "p-2 rounded-xl transition-all cursor-pointer",
            btn.isActive
              ? "bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
              : "text-foreground/40 hover:text-foreground hover:bg-foreground/5"
          )}
        >
          {btn.icon}
        </button>
      ))}
      <div className="w-[1px] h-6 bg-border mx-2" />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className="p-2 text-foreground/40 hover:text-foreground disabled:opacity-20 cursor-pointer"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className="p-2 text-foreground/40 hover:text-foreground disabled:opacity-20 cursor-pointer"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function Editor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const [showToolbar, setShowToolbar] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-2xl border border-border shadow-xl my-8 mx-auto",
        },
      }),
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Write something legendary..." }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setShowToolbar(!editor.state.selection.empty);
    },
    onSelectionUpdate: ({ editor }) => {
      setShowToolbar(!editor.state.selection.empty);
    },
    immediatelyRender: false,
  });

  const isImageSelected = editor?.isActive("image");

  return (
    <div className="relative w-full bg-background border border-border rounded-[2.5rem] overflow-hidden focus-within:ring-4 focus-within:ring-accent-primary/5 transition-all">
      {/* CUSTOM FLOATING TOOLBAR (Alternative to BubbleMenu) */}
      {showToolbar && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 animate-in fade-in zoom-in duration-200">
          <div className="flex items-center gap-1 bg-foreground text-background rounded-2xl shadow-2xl p-1.5 border border-white/10 backdrop-blur-md">
            <button
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            >
              <Bold
                size={16}
                className={
                  editor?.isActive("bold") ? "text-accent-primary" : ""
                }
              />
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            >
              <Italic
                size={16}
                className={
                  editor?.isActive("italic") ? "text-accent-primary" : ""
                }
              />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-1" />
            <button
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              className="p-2 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
            >
              <Quote
                size={16}
                className={
                  editor?.isActive("blockquote") ? "text-accent-primary" : ""
                }
              />
            </button>
            {isImageSelected && (
              <div className="absolute bottom-0 inset-0 z-40 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-200">
                <button
                  onClick={() =>
                    editor?.chain().focus().deleteSelection().run()
                  }
                  className="p-5 bg-red-500 text-white rounded-full shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:bg-red-600 hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/20 backdrop-blur-md pointer-events-auto"
                  title="Remove Image"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <MenuBar editor={editor} />

      <EditorContent
        editor={editor}
        className="prose prose-inkflow max-w-none min-h-[500px] p-10 focus:outline-none"
      />

      <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: rgba(var(--foreground), 0.2);
          pointer-events: none;
          height: 0;
          font-style: italic;
        }
        .ProseMirror {
          min-height: 500px;
          outline: none !important;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          cursor: pointer;
          display: block;
          margin: 2rem auto;
        }
        .ProseMirror img.ProseMirror-selectednode {
          outline: 4px solid #6366f1; /* Your accent color */
          filter: brightness(0.7) grayscale(0.2);
          transition: all 0.3s ease;
        }

        /* Optional: make the button even more prominent */
        .ProseMirror img.ProseMirror-selectednode + div {
          cursor: default;
        }
      `}</style>
    </div>
  );
}
