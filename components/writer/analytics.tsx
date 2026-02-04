"use client";

import { useUser } from "@/hooks/user";
import { cn } from "@/lib/utils";
import StatCardSkeleton from "./skeleton/stat-card";

export default function Analytics() {
  const { isPending, data } = useUser();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {isPending || !data ? (
        <>
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </>
      ) : (
        [
          {
            label: "Total Reads",
            value: data.total_reads,
            trend: "+12%",
            color: "text-accent-primary",
          },
          {
            label: "Avg. Read Time",
            value: data.avg_reading_time,
            trend: "+2%",
            color: "text-emerald-400",
          },
          {
            label: "Fans",
            value: data.follower_count,
            trend: "+8%",
            color: "text-purple-400",
          },
          {
            label: "Earnings",
            value: `$${data.total_revenue}`,
            trend: "+15%",
            color: "text-amber-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="group relative p-8 bg-foreground/[0.02] border border-border rounded-[2.5rem] transition-all duration-500 hover:bg-foreground/[0.04] hover:border-accent-primary/20 cursor-pointer overflow-hidden"
          >
            {/* Decorative Glow - Appears on Hover */}
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-accent-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 space-y-6">
              {/* Header: Label & Sparkline Placeholder */}
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/30 group-hover:text-foreground/50 transition-colors">
                    {stat.label}
                  </p>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full bg-current",
                        stat.color
                      )}
                    />
                    <span className="text-[9px] font-bold text-foreground/20 uppercase tracking-tighter">
                      vs last 30d
                    </span>
                  </div>
                </div>

                {/* Mini Sparkline Visualization */}
                <div className="flex items-end gap-[2px] h-8 pt-2">
                  {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                    <div
                      key={i}
                      className={cn(
                        "w-[3px] rounded-full transition-all duration-700",
                        stat.color,
                        "opacity-20 group-hover:opacity-100"
                      )}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Main Value & Trend */}
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-serif font-bold text-white group-hover:scale-105 transition-transform origin-left duration-500">
                  {stat.value}
                </h3>
                <div className="flex flex-col items-end">
                  <span
                    className={cn(
                      "text-xs font-bold flex items-center gap-1",
                      stat.color
                    )}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="mb-0.5"
                    >
                      <path d="M7 17l9.2-9.2M17 17V7H7" />
                    </svg>
                    {stat.trend}
                  </span>
                  <span className="text-[8px] font-bold text-foreground/20 uppercase">
                    Growth
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
