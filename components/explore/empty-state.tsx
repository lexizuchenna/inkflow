// src/components/explore/EmptyState.tsx
import { SearchX, ArrowRight, RefreshCcw } from "lucide-react";

export default function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-24 h-24 bg-foreground/5 rounded-full flex items-center justify-center mb-6">
        <SearchX size={48} className="text-foreground/20" />
      </div>

      <h2 className="text-2xl font-serif font-bold mb-2">
        No stories found for "{query}"
      </h2>
      <p className="text-foreground/50 max-w-sm mb-8">
        We couldn&apos;t find any matches. Try checking your spelling or using
        more general keywords.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button className="flex items-center justify-center gap-2 p-4 border border-border rounded-2xl hover:bg-foreground/5 transition-colors">
          <RefreshCcw size={18} /> Clear Filters
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-accent-primary text-white rounded-2xl hover:opacity-90 transition-all">
          Explore Trending <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
