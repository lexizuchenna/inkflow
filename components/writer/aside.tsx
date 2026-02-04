"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { DASHBOARD_NAV } from "@/constants/dashboard";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/user";
import { ErrorState } from "../shared/error";
import { AsideSkeleton } from "./skeleton/aside";

export default function Aside() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isPending, isError, error, refetch } = useUser();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContent = () => {
    if (isPending) return <AsideSkeleton />;

    return (
      <>
        <div className="flex items-center justify-between px-4 mb-10">
          <div className="flex items-center gap-3">
            {data?.avatar_url ? (
              <img
                src={data.avatar_url}
                alt={data.username}
                className="h-10 w-10 rounded-full object-cover border border-border shadow-lg"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-accent-primary flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg shadow-accent-primary/20">
                {data?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">
                {data?.display_name || data?.username}
              </p>
              <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                {data?.role}
              </p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 text-foreground/40 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 space-y-8">
          <div className="space-y-2">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.4em] text-foreground/20 px-4 mb-4">
              Main Menu
            </h2>
            <nav className="space-y-1.5">
              {DASHBOARD_NAV.map((item) => {
                const isActive = pathname === item.link;
                return (
                  <Link
                    href={item.link}
                    key={item.name}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group cursor-pointer",
                      isActive
                        ? "bg-foreground text-background shadow-xl shadow-foreground/5"
                        : "text-foreground/50 hover:text-white hover:bg-foreground/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          isActive
                            ? "text-background"
                            : "text-foreground/30 group-hover:text-accent-primary"
                        )}
                      >
                        <item.icon size={18} />
                      </span>
                      <span className="text-sm font-bold tracking-tight">
                        {item.name}
                      </span>
                    </div>
                    {isActive && (
                      <div className="h-1.5 w-1.5 rounded-full bg-accent-primary animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* ... Preferences section remains same ... */}
        </div>

        <div className="mt-auto pt-6 border-t border-border">
          <div className="p-5 bg-accent-primary/5 rounded-[2rem] border border-accent-primary/10 relative overflow-hidden group">
            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-primary">
                  Total Stories
                </p>
                <span className="text-[10px] font-bold text-white">
                  {data?.stories?.length || 0}
                </span>
              </div>
              <div className="h-1.5 w-full bg-accent-primary/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-primary rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      (data?.stories?.length || 0) * 10,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-foreground/40 leading-relaxed italic">
                Keep writing to reach your goals.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (isError) return <ErrorState error={error} onRetry={refetch} />;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[105] bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleSidebar}
      />
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-[110] w-72 bg-background border-r border-border p-6 flex flex-col transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </div>

      <aside className="hidden md:flex w-72 border-r border-border bg-foreground/[0.01] p-6 flex-col h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle Button */}
      {!isPending && (
        <div className="md:hidden fixed bottom-6 right-6 z-[110]">
          <button
            onClick={toggleSidebar}
            className="p-4 bg-foreground text-background rounded-full shadow-2xl border border-white/10 active:scale-90 transition-transform"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      )}
    </>
  );
}
