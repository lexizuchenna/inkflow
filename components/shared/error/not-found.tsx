import Link from "next/link";
import { Search, Home, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="relative mb-12">
        <div className="text-[12rem] md:text-[18rem] font-serif font-bold text-foreground/[0.03] leading-none select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            {/* Decorative abstract "ink blot" or icon */}
            <div className="absolute inset-0 bg-accent-primary/10 rounded-full animate-pulse blur-2xl" />
            <div className="relative flex items-center justify-center h-full">
              <BookOpen
                size={80}
                className="text-accent-primary opacity-80"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md space-y-6">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          The story you're looking for has been{" "}
          <span className="italic text-accent-primary">unwritten.</span>
        </h1>
        <p className="text-foreground/50 leading-relaxed">
          Perhaps the ink dried up, or the author decided on a different ending.
          Either way, this page is currently a blank canvas.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/explore"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-bg-primary text-background dark:bg-paper-50 dark:text-ink-900 rounded-2xl font-bold transition-transform hover:scale-105"
          >
            <Search size={18} /> Search Stories
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-2xl font-bold hover:bg-bg-primary/5 transition-colors"
          >
            <Home size={18} /> Go Home
          </Link>
        </div>

        <div className="pt-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 mb-4">
            Try a different path
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Technology", "Lifestyle", "Literature", "Design"].map(
              (topic) => (
                <Link
                  key={topic}
                  href={`/explore?tag=${topic.toLowerCase()}`}
                  className="text-xs font-bold text-foreground/40 hover:text-accent-primary transition-colors"
                >
                  #{topic}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
