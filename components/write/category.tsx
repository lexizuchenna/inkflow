"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Plus, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";

interface CategorySearchProps {
  value: string;
  onChange: (category: string) => void;
}

export default function CategorySearch({
  value,
  onChange,
}: CategorySearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [], isLoading } = useQuery({
    queryKey: ["categories-search", search],
    queryFn: async () => {
      if (!search) return [];
      const res = await api.get<{ data: Array<string> }>(
        `/categories/search?q=${search}`
      );
      return res.data.data;
    },
    enabled: search.length > 1,
  });

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (cat: string) => {
    onChange(cat);
    setSearch(cat);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3 relative" ref={containerRef}>
      <label className="text-[11px] font-bold uppercase tracking-wider text-text-primary/50">
        Category
      </label>

      <div className="relative group">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-primary/20 group-focus-within:text-accent-primary transition-colors"
        />
        <input
          type="text"
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search or create category..."
          className="w-full bg-bg-secondary border border-border rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent-primary/10 transition-all"
        />
      </div>

      {isOpen && search.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-2 bg-bg-secondary border border-border rounded-2xl shadow-2xl p-2 z-[60] animate-in fade-in slide-in-from-top-2">
          {isLoading && (
            <div className="p-4 flex justify-center">
              <Loader2 size={16} className="animate-spin text-accent-primary" />
            </div>
          )}

          {suggestions.map((cat) => (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className="w-full text-left px-4 py-2.5 text-sm rounded-xl hover:bg-bg-primary/5 transition-colors flex items-center justify-between"
            >
              {cat}
              <span className="text-[10px] text-text-primary/20 font-bold uppercase tracking-widest">
                Community
              </span>
            </button>
          ))}

          {!suggestions.includes(search) && (
            <button
              onClick={() => handleSelect(search)}
              className="w-full text-left px-4 py-2.5 text-sm rounded-xl hover:bg-accent-primary/5 text-accent-primary transition-colors flex items-center gap-2 font-medium"
            >
              <Plus size={14} />
              Use "{search}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}
