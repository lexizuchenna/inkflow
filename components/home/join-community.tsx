"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PenTool, Send, Sparkles, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { api } from "@/lib/axios";
import { verify_email } from "@/utils";
import { useAlert } from "@/providers/alert";

export default function JoinCommunity() {
  const [email, setEmail] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const msg = searchParams.get("msg");
    const error = searchParams.get("error");

    if (error && msg) {
      alert.error(msg.split("_").join(" ").toUpperCase());
    } else if (success && msg) {
      alert.success(msg.split("_").join(" ").toUpperCase());
    }

    window.history.replaceState({}, "", "/");
  }, []);

  const alert = useAlert();

  const submitForm = useMutation({
    mutationFn: () => api.post<ApiResponse<null>>(`/newsletter`, { email }),
    onSuccess: () => {
      setEmail("");
      alert.success(
        "Verification email sent! Please check your inbox to confirm."
      );
    },
    onError: (error) => {
      alert.error(error.message || "Something went wrong, please try again");
    },
  });

  return (
    <section className="my-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 relative overflow-hidden bg-ink-900 dark:bg-ink-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-center border border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 blur-[80px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 blur-[60px] rounded-full -ml-10 -mb-10" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} className="text-accent-primary" />
              For Creators
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Share your story <br /> with the{" "}
              <span className="text-accent-primary italic">world.</span>
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Join a community of 1,000+ writers. Publish your articles, grow
              your audience, and get discovered by readers globally.
            </p>
            <Link
              href="/write"
              className="inline-flex items-center gap-2 bg-accent-primary text-white font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg shadow-accent-primary/20"
            >
              Start Writing <PenTool size={18} />
            </Link>
          </div>

          <div className="hidden md:block w-48 h-48 lg:w-64 lg:h-64 relative">
            <div className="absolute inset-0 bg-accent-primary/20 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center">
              <PenTool size={60} className="text-white opacity-50" />
            </div>
          </div>
        </div>
      </div>

      {/* NEWSLETTER BANNER (1/3 space) */}
      <div className="relative overflow-hidden bg-accent-primary rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between group min-h-[400px]">
        <div className="flex flex-col h-full justify-between animate-in fade-in duration-500">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 text-white">
              <Send size={24} />
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
              Join the Flow
            </h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Get the week&apos;s most insightful stories delivered directly to
              your inbox. No spam, just pure inspiration.
            </p>
          </div>

          <form
            className="relative z-10 space-y-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 transition-all text-sm"
            />
            <button
              type="button"
              className="cursor-pointer w-full bg-white text-accent-primary font-bold py-4 rounded-2xl hover:bg-paper-50 shadow-xl shadow-black/5 active:scale-95 transition-transform disabled:cursor-not-allowed disabled:bg-white/50 flex items-center justify-center"
              disabled={!email.trim() || !verify_email.test(email)}
              onClick={() => submitForm.mutate()}
            >
              {submitForm.isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Subscribe Now"
              )}
            </button>
          </form>
        </div>

        {/* Decorative Background for Newsletter */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
      </div>
    </section>
  );
}
