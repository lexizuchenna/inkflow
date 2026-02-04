"use client";

import { cn } from "@/lib/utils";

export default function HeaderSkeleton({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-border/50 animate-pulse",
        className ?? ""
      )}
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {/* Main Greeting Skeleton */}
          <div className="flex items-center gap-2">
            <div className="h-10 md:h-12 lg:h-16 w-64 md:w-80 lg:w-[450px] bg-foreground/10 rounded-2xl" />
          </div>

          {/* Subtext Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full max-w-md bg-foreground/5 rounded-lg" />
            <div className="h-4 w-3/4 max-w-sm bg-foreground/5 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="h-[60px] w-56 bg-foreground/10 rounded-[1.5rem]" />
      </div>
    </header>
  );
}
