// src/components/article/Comments.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Heart,
  Reply,
  MoreHorizontal,
  Send,
} from "lucide-react";
import CommentInput from "./comment-input";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";

export default function Comments() {
  const [comment, setComment] = useState("");

  return (
    <section className="mt-20 pt-12 border-t border-border">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <MessageSquare className="text-accent-primary" size={24} />
          <h3 className="text-2xl font-serif font-bold">Conversations</h3>
          <span className="bg-foreground/5 text-foreground/50 px-3 py-1 rounded-full text-xs font-bold">
            12
          </span>
        </div>
      </div>

      {/* --- INPUT AREA --- */}
      <div className="flex gap-4 mb-12">
        <div className="w-10 h-10 rounded-full bg-accent-primary/10 overflow-hidden shrink-0 border border-border">
          <Image
            src="https://i.pravatar.cc/100?u=me"
            alt="My Profile"
            width={40}
            height={40}
          />
        </div>
        <SignedIn>
          <CommentInput comment={comment} setComment={setComment} />
        </SignedIn>
        <SignedOut>
          <div className="p-8 bg-foreground/5 rounded-2xl text-center">
            <p className="text-sm text-foreground/60 mb-4">
              Join the conversation
            </p>
            <SignInButton>
              <button className="bg-accent-primary text-white px-6 py-2 rounded-xl font-bold">
                Sign in to comment
              </button>
            </SignInButton>
          </div>
        </SignedOut>
      </div>

      {/* --- COMMENT LIST --- */}
      <div className="space-y-8">
        <CommentItem
          author="Kelvin Ojelum"
          role="Top Contributor"
          time="2 hours ago"
          text="This perspective on the digital landscape in Nigeria is exactly what we've been discussing at Attitech. The shift toward minimalist storytelling is inevitable."
          likes={12}
          hasReplies
        />
        <CommentItem
          author="Henry Giwa"
          time="5 hours ago"
          text="Great read! I especially loved the section on typography. It's often overlooked but makes 90% of the vibe."
          likes={4}
        />
      </div>
    </section>
  );
}

// --- SUB-COMPONENT FOR INDIVIDUAL COMMENTS ---
function CommentItem({ author, role, time, text, likes, hasReplies }: any) {
  return (
    <div className="group">
      <div className="flex gap-4">
        {/* Avatar with Thread Line */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-foreground/5 overflow-hidden border border-border">
            <Image
              src={`https://i.pravatar.cc/100?u=${author}`}
              alt={author}
              width={40}
              height={40}
            />
          </div>
          {hasReplies && (
            <div className="w-[2px] grow bg-border my-2 rounded-full" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-foreground">{author}</h4>
              {role && (
                <span className="text-[9px] font-bold uppercase bg-accent-primary/10 text-accent-primary px-2 py-0.5 rounded">
                  {role}
                </span>
              )}
              <span className="text-xs text-foreground/30">• {time}</span>
            </div>
            <button className="text-foreground/20 hover:text-foreground">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <p className="text-sm leading-relaxed text-foreground/80">{text}</p>

          <div className="flex items-center gap-6 pt-1">
            <button className="flex items-center gap-1.5 text-xs font-bold text-foreground/40 hover:text-accent-primary transition-colors">
              <Heart size={14} /> {likes}
            </button>
            <button className="flex items-center gap-1.5 text-xs font-bold text-foreground/40 hover:text-accent-primary transition-colors">
              <Reply size={14} /> Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
