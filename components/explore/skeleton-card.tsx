// src/components/explore/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bg-background border border-border rounded-[1.5rem] overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-[4/5] bg-foreground/5" />

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <div className="h-4 w-16 bg-foreground/5 rounded" />
          <div className="h-4 w-12 bg-foreground/5 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-full bg-foreground/10 rounded" />
          <div className="h-5 w-2/3 bg-foreground/10 rounded" />
        </div>
        <div className="pt-4 border-t border-border/50 flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-foreground/5" />
          <div className="h-3 w-20 bg-foreground/5 rounded" />
        </div>
      </div>
    </div>
  );
}
