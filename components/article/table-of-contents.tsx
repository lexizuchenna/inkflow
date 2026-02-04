// src/components/article/TableOfContents.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ListTree, Hash } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // 1. Grab all H2 and H3 tags from the article body
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .map((elem) => ({
        id: elem.id,
        text: elem.textContent || "",
        level: Number(elem.tagName.substring(1)),
      }))
      .filter((item) => item.id);

    setHeadings(elements);

    // 2. Intersection Observer to track which section is active
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -80% 0%" } // Adjusts "active" zone
    );

    document
      .querySelectorAll("h2, h3")
      .forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-6">
      <div className="flex items-center gap-2 text-foreground/30 font-bold text-[10px] uppercase tracking-[0.2em] mb-4">
        <ListTree size={14} />
        <span>In this story</span>
      </div>

      <ul className="space-y-1 relative border-l border-border/50">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ paddingLeft: `${(heading.level - 2) * 1}rem` }}
            className="relative"
          >
            {/* Active Indicator Line */}
            {activeId === heading.id && (
              <div className="absolute left-[-1.5px] top-0 bottom-0 w-[2px] bg-accent-primary animate-in fade-in duration-300" />
            )}

            <a
              href={`#${heading.id}`}
              className={`
                block py-2 px-4 text-sm transition-all duration-300
                ${
                  activeId === heading.id
                    ? "text-accent-primary font-bold translate-x-1"
                    : "text-foreground/50 hover:text-foreground hover:translate-x-1"
                }
              `}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>

      {/* Quick Action: Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/30 hover:text-accent-primary transition-colors pt-4"
      >
        <Hash size={12} /> Back to Top
      </button>
    </nav>
  );
}
