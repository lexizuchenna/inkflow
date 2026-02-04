"use client";

export default function StoryItemSkeleton() {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between p-5 rounded-[2rem] border border-border bg-background animate-pulse overflow-hidden">
      <div className="flex items-center gap-6">
        <div className="relative h-20 w-20 shrink-0 rounded-2xl bg-foreground/[0.05] border border-border" />

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-6 w-48 md:w-64 bg-foreground/[0.08] rounded-lg" />

            <div className="h-4 w-14 bg-foreground/[0.05] rounded-full" />
          </div>

          <div className="flex items-center gap-x-4">
            <div className="h-2 w-16 bg-foreground/[0.03] rounded-full" />
            <div className="h-1 w-1 rounded-full bg-border/50" />
            <div className="h-2 w-16 bg-foreground/[0.03] rounded-full" />
            <div className="h-1 w-1 rounded-full bg-border/50" />
            <div className="h-2 w-20 bg-foreground/[0.03] rounded-full" />
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton - Hidden on mobile, visible on desktop to match layout */}
      <div className="hidden md:flex items-center gap-3">
        <div className="h-8 w-16 bg-foreground/[0.03] rounded-xl" />
        <div className="h-8 w-16 bg-foreground/[0.03] rounded-xl" />
        <div className="h-4 w-[1px] bg-border mx-1" />
        <div className="h-9 w-9 bg-foreground/[0.03] rounded-xl" />
      </div>
    </div>
  );
}
