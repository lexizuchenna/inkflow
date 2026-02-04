"use client";

import { api } from "@/lib/axios";
import { useAlert } from "@/providers/alert";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
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
    <form className="relative">
      <input
        type="email"
        placeholder="email@example.com"
        className="w-full bg-foreground/5 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-primary transition-colors"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="button"
        className="absolute right-2 top-2 bg-foreground text-background p-1.5 rounded-lg hover:bg-accent-primary transition-colors"
        onClick={() => submitForm.mutate()}
      >
        {submitForm.isPending ? (
          <Loader2 className="animate-spin" size={14} />
        ) : (
          <Mail size={16} />
        )}
      </button>
    </form>
  );
}
