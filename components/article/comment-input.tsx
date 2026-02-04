import React from "react";
import { Send } from "lucide-react";

export default function CommentInput({
  comment,
  setComment,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-1 relative group">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your thoughts on this story..."
        className="w-full bg-foreground/[0.03] border border-border rounded-2xl p-4 min-h-[120px] text-sm focus:outline-none focus:border-accent-primary transition-all resize-none"
      />
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <span className="text-[10px] text-foreground/30 font-bold uppercase mr-2">
          Markdown Supported
        </span>
        <button className="bg-foreground text-background dark:bg-paper-50 dark:text-ink-900 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-accent-primary transition-colors">
          Post <Send size={14} />
        </button>
      </div>
    </div>
  );
}
