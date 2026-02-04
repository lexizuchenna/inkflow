"use client";

import { cn } from "@/lib/utils";

export default function StatCardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative p-8 bg-foreground/[0.02] border border-border rounded-[2.5rem] animate-pulse overflow-hidden",
        className ?? ""
      )}
    >
      <div className="relative z-10 space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            {/* Label Line */}
            <div className="h-2 w-20 bg-foreground/10 rounded-full" />
            {/* Trend Indicator Line */}
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
              <div className="h-2 w-16 bg-foreground/5 rounded-full" />
            </div>
          </div>

          <div className="flex items-end gap-[2px] h-8 pt-2">
            {[40, 70, 45, 90, 65, 80, 50].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-foreground/10 rounded-full"
                style={{ height: `${_}%` }}
              />
            ))}
          </div>
        </div>

        {/* Main Value & Trend Skeleton */}
        <div className="flex items-end justify-between pt-2">
          {/* Large Value Placeholder */}
          <div className="h-8 w-24 bg-foreground/10 rounded-lg" />

          <div className="flex flex-col items-end space-y-2">
            {/* Trend % Placeholder */}
            <div className="h-3 w-12 bg-foreground/10 rounded-full" />
            {/* "Growth" Text Placeholder */}
            <div className="h-2 w-8 bg-foreground/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
