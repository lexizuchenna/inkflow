"use client";

import { Plus, PenTool, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EmptyStoryState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex flex-col items-center justify-center p-12 md:p-20 rounded-[2.5rem] border border-dashed border-border bg-foreground/[0.01] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-sm">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-accent-primary/20 blur-2xl rounded-full" />
          <div className="relative h-20 w-20 flex items-center justify-center rounded-[2rem] bg-background border border-border shadow-2xl">
            <PenTool className="w-8 h-8 text-accent-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-accent-primary rounded-full flex items-center justify-center border-4 border-background text-white">
            <Plus size={14} strokeWidth={3} />
          </div>
        </div>

        <h3 className="text-2xl font-serif font-bold text-white mb-3 tracking-tight">
          Your ink hasn't flowed yet
        </h3>
        <p className="text-foreground/40 text-sm font-medium leading-relaxed mb-10">
          The world is waiting for your perspective. Start your first story and
          begin building your audience today.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <Link
            href="/write"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            Write Story
          </Link>
          <Link
            href="/guides"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-foreground/5 text-foreground/60 rounded-2xl font-bold text-sm hover:bg-foreground/10 transition-all border border-transparent hover:border-border"
          >
            <BookOpen size={16} />
            Read Guides
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
