export function AsideSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse px-4">
      {/* Header Skeleton */}
      <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 rounded-full bg-bg-secondary/50" />
        <div className="space-y-2">
          <div className="h-3 w-24 bg-bg-secondary/50 rounded" />
          <div className="h-2 w-16 bg-bg-secondary/40 rounded" />
        </div>
      </div>
      {/* Nav Skeleton */}
      <div className="flex-1 space-y-8">
        {[1, 2].map((group) => (
          <div key={group} className="space-y-3">
            <div className="h-2 w-20 bg-bg-secondary/40 rounded mb-4" />
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-10 w-full bg-bg-secondary/40 rounded-2xl"
              />
            ))}
          </div>
        ))}
      </div>
      {/* Footer Skeleton */}
      <div className="mt-auto pt-6 border-t border-border">
        <div className="h-24 w-full bg-bg-secondary/40 rounded-[2rem]" />
      </div>
    </div>
  );
}
