"use client";

import Link from "next/link";
import { RefreshCcw, Home, Send, Bug } from "lucide-react";

interface ErrorProps {
  error?: any;
  reset?: () => void;
}

export default function InternalServerError({ error, reset }: ErrorProps) {
  const handleReportError = () => {
    // Logic to send 'error' data to your logging service (e.g., Sentry, LogRocket)
    console.log("Reporting diagnostic data:", error);
    alert(
      "Error data sent to the InkFlow technical team. Thank you for your patience."
    );
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Visual Element: The Broken Quill */}
      <div className="relative mb-12">
        <div className="text-[12rem] md:text-[18rem] font-serif font-bold text-foreground/[0.03] leading-none select-none">
          500
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-32 h-32 md:w-48 md:h-48">
            <div className="absolute inset-0 bg-red-500/10 rounded-full animate-pulse blur-3xl" />
            <div className="relative flex items-center justify-center h-full">
              <Bug
                size={80}
                className="text-red-500 opacity-80 rotate-12"
                strokeWidth={1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-6">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          A chapter in our code has{" "}
          <span className="italic text-red-500">collapsed.</span>
        </h1>
        <p className="text-foreground/50 leading-relaxed">
          Our ink is clotted and the system is temporarily unable to transcribe
          this request. Don't worry, the story is safe—we just need a moment to
          fix the quill.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => (reset ? reset() : window.location.reload())}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background dark:bg-white dark:text-black rounded-2xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-foreground/10"
          >
            <RefreshCcw size={18} /> Refresh Page
          </button>

          <button
            onClick={handleReportError}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 border border-border rounded-2xl font-bold hover:bg-red-500/5 hover:border-red-500/20 hover:text-red-500 transition-all active:scale-95"
          >
            <Send size={18} /> Report Issue
          </button>
        </div>

        {/* Diagnostic Metadata (Optional/Hidden) */}
        {error && (
          <div className="pt-10">
            <details className="cursor-pointer group">
              <summary className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 group-hover:text-foreground/40 transition-colors list-none">
                View Technical Manuscript
              </summary>
              <div className="mt-4 p-4 bg-foreground/[0.02] border border-border rounded-xl text-left overflow-auto max-h-40">
                <code className="text-[10px] text-red-400 font-mono leading-tight whitespace-pre-wrap">
                  {JSON.stringify(error, null, 2)}
                </code>
              </div>
            </details>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-foreground/40 hover:text-foreground transition-colors"
          >
            <Home size={14} /> Return to the Library
          </Link>
        </div>
      </div>
    </div>
  );
}
