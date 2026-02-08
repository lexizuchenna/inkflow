"use client";

import { BlogPostForm } from "@/app/write/page";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

interface TagProps {
  blogContent: BlogPostForm;
  setBlogContent: React.Dispatch<React.SetStateAction<BlogPostForm>>;
}

export default function Tags({ blogContent, setBlogContent }: TagProps) {
  const [tagInput, setTagInput] = useState("");

  const addTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if (
      (e.nativeEvent instanceof KeyboardEvent &&
        // @ts-ignore
        e.key === "Enter" &&
        tagInput.trim()) ||
      (e.nativeEvent instanceof MouseEvent && tagInput.trim())
    ) {
      e.preventDefault();

      if (
        (blogContent.tags as Array<string>).includes(
          tagInput.trim().toLowerCase()
        )
      ) {
        return setTagInput("");
      }
      setBlogContent((prev) => ({
        ...prev,
        tags: [...(prev.tags as Array<string>), tagInput.trim().toLowerCase()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setBlogContent((prev) => ({
      ...prev,
      tags: (prev.tags as Array<string>).filter((t) => t !== tagToRemove),
    }));
  };
  return (
    <div className="space-y-4">
      <label className="text-[11px] font-bold uppercase tracking-wider text-foreground/50">
        Tags
      </label>
      <div className="relative">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={addTag}
          placeholder="Add a tag and press Enter..."
          className="w-full bg-background border border-border rounded-2xl pl-4 pr-10 py-3 text-sm outline-none focus:border-accent-primary/50 transition-all"
        />
        <button
          className="bg-accent-primary p-1 rounded-full absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={addTag}
        >
          <Plus size={18} className=" text-white" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(blogContent.tags as Array<string>).map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-accent-primary/5 border border-accent-primary/10 text-accent-primary rounded-full text-[11px] font-bold transition-all hover:bg-accent-primary/10 group"
          >
            #{tag}
            <button
              onClick={() => removeTag(tag)}
              className="p-0.5 hover:bg-accent-primary/20 rounded-full transition-colors"
            >
              <X size={12} />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
