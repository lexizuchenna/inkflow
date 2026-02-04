"use client";

import { AlertCircle, RefreshCcw, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

interface ErrorStateProps {
  error?: unknown; // Pass the whole error object here
  title?: string;
  message?: string;
  type?: "generic" | "network";
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  error,
  title,
  message,
  type,
  onRetry,
  className,
}: ErrorStateProps) {
  const isAxiosError = axios.isAxiosError(error);
  const isNetworkError = isAxiosError && !error.response && !!error.request;

  const serverError = isAxiosError ? (error.response?.data as ApiError) : null;

  const finalType = type || (isNetworkError ? "network" : "generic");
  const isNetwork = finalType === "network";

  const finalTitle =
    title ||
    serverError?.error ||
    (isNetwork ? "Connection Lost" : "Request Failed");

  const finalMessage =
    message ||
    serverError?.message ||
    (isNetwork
      ? "We couldn't reach the InkFlow servers. Check your internet connection."
      : "An unexpected error occurred. Please try again later.");

  const statusCode =
    serverError?.statusCode || (isAxiosError ? error.response?.status : null);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] p-8 text-center animate-in fade-in zoom-in-95 duration-500",
        className ?? ""
      )}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full" />
        <div className="relative flex items-center justify-center w-20 h-20 rounded-[2rem] bg-background border border-border shadow-xl">
          {isNetwork ? (
            <WifiOff className="w-10 h-10 text-accent-primary" />
          ) : (
            <AlertCircle className="w-10 h-10 text-red-500" />
          )}
        </div>
      </div>

      <div className="max-w-md space-y-3">
        <h2 className="text-3xl font-serif font-bold text-foreground dark:text-white">
          {finalTitle}
        </h2>
        <p className="text-foreground/50 dark:text-foreground/40 font-medium leading-relaxed">
          {finalMessage}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-10 group flex items-center gap-3 bg-foreground text-background dark:bg-white dark:text-black px-8 py-4 rounded-2xl text-sm font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          Try Again
        </button>
      )}

      <div className="mt-12 text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/20">
        {isNetwork
          ? "ERR_CONNECTION_FAILED"
          : `CODE: ${statusCode || "UNKNOWN_ERROR"}`}
      </div>
    </div>
  );
}
