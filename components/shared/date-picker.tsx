"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";

import "react-day-picker/dist/style.css";

interface DatePickerProps {
  date?: Date;
  onChange: (date?: Date) => void;
  label?: string;
  className?: string;
}

export default function UniversalDatePicker({
  date,
  onChange,
  label = "Filter by Date",
  className,
}: DatePickerProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-4 py-2 bg-foreground/5 border border-border rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer outline-none group",
            date
              ? "text-white border-white/40 bg-white/5"
              : "text-foreground/60 hover:text-white hover:border-border/80",
            className ?? ""
          )}
        >
          <Filter
            size={14}
            className={cn((date ?? "") && "text-accent-primary")}
          />
          <span>{date ? format(date, "PPP") : label}</span>
          {date && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                onChange(undefined);
              }}
              className="ml-1 p-0.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={12} />
            </div>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={8}
          className="z-[160] bg-background border border-border p-4 rounded-[2rem] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        >
          <style>{`
            .rdp { --rdp-accent-color: var(--accent-primary); --rdp-background-color: rgba(255,255,255,0.05); margin: 0; }
            .rdp-day_selected { background-color: #6366f1 !important; font-weight: bold; border-radius: 12px; }
            .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: rgba(255,255,255,0.05); border-radius: 12px; }
          `}</style>

          <DayPicker
            mode="single"
            selected={date}
            onSelect={onChange}
            showOutsideDays
            className="font-sans text-sm"
          />

          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
