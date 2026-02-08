"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  History,
  FileText,
  User,
  Layers,
  X,
  Loader2,
  ArrowRight,
} from "lucide-react";

const RECENT_SEARCHES = ["Next.js 15", "Minimalist Design", "Lagos Startups"];

export default function SearchCommandCenter() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate search loading
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-50">
      <div
        className={`
        relative flex items-center transition-all duration-300 border-2
        ${
          isFocused
            ? "border-accent-primary bg-bg-secondary ring-4 ring-accent-primary/10"
            : "border-border bg-paper-100 dark:bg-ink-800"
        }
        rounded-2xl px-5 py-4
      `}
      >
        <Search
          className={`mr-4 ${
            isFocused ? "text-accent-primary" : "text-foreground/40"
          }`}
          size={22}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search for articles, authors, or series..."
          className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-foreground/30"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-1 hover:bg-foreground/10 rounded-full"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* --- RESULTS DROPDOWN --- */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* STATE A: Recent Searches (Show when input is empty) */}
          {!query && (
            <div className="p-4">
              <div className="flex items-center gap-2 px-3 mb-3">
                <History size={14} className="text-foreground/40" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                  Recent Searches
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {RECENT_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-foreground/5 text-left transition-colors group"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-accent-primary"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STATE B: Search Results (Show when typing) */}
          {query && (
            <div className="max-h-[450px] overflow-y-auto p-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-foreground/40">
                  <Loader2 className="animate-spin mb-2" size={24} />
                  <p className="text-sm italic">Searching InkFlow...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <ResultSection title="Articles">
                    <ResultItem
                      icon={<FileText size={16} />}
                      title="Mastering Next.js 15 Server Components"
                      type="Article"
                    />
                    <ResultItem
                      icon={<FileText size={16} />}
                      title="The Growth of Tech in Nigeria"
                      type="Article"
                    />
                  </ResultSection>

                  <ResultSection title="Authors">
                    <ResultItem
                      icon={<User size={16} />}
                      title="Grace Ochinokwu"
                      type="Author"
                      isAuthor
                    />
                    <ResultItem
                      icon={<User size={16} />}
                      title="Kelvin Ojelum"
                      type="Author"
                      isAuthor
                    />
                  </ResultSection>

                  <ResultSection title="Series">
                    <ResultItem
                      icon={<Layers size={16} />}
                      title="The Sun in the City"
                      type="Series"
                    />
                  </ResultSection>

                  <div className="p-2 border-t border-border mt-2">
                    <button className="w-full py-3 bg-accent-primary/10 text-accent-primary text-sm font-bold rounded-xl hover:bg-accent-primary hover:text-white transition-all">
                      View all results for "{query}"
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEANLINESS ---

function ResultSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-2">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 px-3 mb-2">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function ResultItem({
  icon,
  title,
  type,
  isAuthor,
}: {
  icon: any;
  title: string;
  type: string;
  isAuthor?: boolean;
}) {
  return (
    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-foreground/5 transition-colors group text-left">
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${
            isAuthor
              ? "bg-accent-primary/10 text-accent-primary"
              : "bg-foreground/5 text-foreground/60"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold group-hover:text-accent-primary transition-colors">
            {title}
          </p>
          <p className="text-[10px] text-foreground/40">{type}</p>
        </div>
      </div>
      <ArrowRight
        size={14}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground/20"
      />
    </button>
  );
}
