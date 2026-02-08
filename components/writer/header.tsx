"use client";

import { PenSquare } from "lucide-react";
import Link from "next/link";

import { useUser } from "@/hooks/user";
import { getTimeGreeting } from "@/utils/greeting";

export default function Header() {
  const { data, isPending } = useUser();

  return (
    <header className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-border/50">
      {isPending || !data ? (
        <div className="space-y-4">
          <div className="space-y-3">
            {/* Main Greeting Skeleton */}
            <div className="flex items-center gap-2">
              <div className="h-10 md:h-12 lg:h-16 w-64 md:w-80 lg:w-[450px] bg-bg-secondary/50 rounded-2xl" />
            </div>

            {/* Subtext Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full max-w-md bg-bg-secondary/40 rounded-lg" />
              <div className="h-4 w-3/4 max-w-sm bg-bg-secondary/40 rounded-lg" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Good {getTimeGreeting()}, {data.display_name}
              <span className="text-accent-primary">.</span>
            </h1>
            <p className="text-foreground/40 font-medium text-lg max-w-xl">
              Your latest story{" "}
              <span className="text-white/80">"The Chaos of Lagos"</span> is
              trending in{" "}
              <span className="text-accent-primary/80">#Technology</span>.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Link href="/write">
          <button className="group relative flex items-center gap-3 bg-white text-black px-8 py-4 rounded-[1.5rem] text-sm font-bold shadow-2xl hover:bg-accent-primary hover:text-white transition-all duration-500 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-accent-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              <PenSquare size={18} />
              Create New Story
            </span>
          </button>
        </Link>
      </div>
    </header>
  );
}
