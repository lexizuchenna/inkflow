"use client";

import React, { useRef } from "react";
import Link from "next/link";
import dayjs from "dayjs";

import { Eye, Calendar, BarChart2, Trash2, Edit3, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAlert } from "@/providers/alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storyService } from "@/services/story";
import ActionModal from "../shared/action-modal";
import { stories } from "@/app/generated/prisma/client";

export default function StoryCard({
  story,
  page = 1,
}: {
  story: stories;
  page?: number;
}) {
  const deleteRef = useRef<{ open: (options: ActionModalOptions) => void }>(
    null
  );
  const archiveRef = useRef<{ open: (options: ActionModalOptions) => void }>(
    null
  );
  const alert = useAlert();
  const queryClient = useQueryClient();

  const deleteStory = useMutation({
    mutationFn: () => storyService.deleteStory(story.slug),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["user-stories", 1],
        (oldData: { stories: Array<stories> }) => {
          console.log("old", oldData);
          if (!oldData) return oldData;

          return {
            ...oldData,
            stories: oldData.stories.filter((s) => s.slug !== data.slug),
          };
        }
      );
    },
    onError: (error) =>
      alert.error(error.message || "Something went wrong, try again"),
  });

  const archiveStory = useMutation({
    mutationFn: () =>
      storyService.updateStory(story.slug, { ...story, status: "archived" }),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["user-stories"],
        (oldData: { stories: Array<stories> }) => {
          console.log("old", oldData);
          if (!oldData) return oldData;

          const index = oldData.stories.findIndex((s) => s.id === data.id);

          if (!index) return oldData;

          const newStories = [...oldData.stories];

          newStories[index].status = data.status;

          return { ...oldData, stories: newStories };
        }
      );
      alert.success("Story successfully archived");
    },
    onError: (error) =>
      alert.error(error.message || "Something went wrong, try again"),
  });

  return (
    <React.Fragment>
      <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] border border-border bg-white dark:bg-bg-secondary/[0.03] shadow-sm hover:shadow-xl hover:border-accent-primary/30 hover:bg-slate-50 dark:hover:bg-bg-primary/[0.06] transition-all duration-500 cursor-pointer overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <div className="relative h-20 w-20 shrink-0 rounded-2xl bg-bg-secondary/5 border border-border overflow-hidden shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${story.featured_image})` }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="font-serif font-bold text-lg md:text-xl text-foreground dark:text-white group-hover:text-accent-primary transition-colors leading-snug">
                {story.title}
              </h4>
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border shrink-0",
                  story.status === "published"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
                    : story.status === "archived"
                    ? "bg-red-500/10 text-red-600 dark:text-red-500 border-red-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20"
                )}
              >
                {story.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/40 dark:text-foreground/30">
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Calendar size={12} />{" "}
                {dayjs(story.created_at).format("MMM DD, YYYY")}
              </span>
              <span className="hidden sm:block h-1 w-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <Eye size={12} /> {story.view_count} Reads
              </span>
              <span className="hidden sm:block h-1 w-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5 whitespace-nowrap">
                <BarChart2 size={12} /> {Number(story.completion_rate)}{" "}
                Completion
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-6 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/50">
          <Link
            href={`/edit/${story.slug}`}
            title="Edit Story"
            className="p-3 md:p-2.5 text-foreground/50 hover:text-foreground dark:hover:text-white hover:bg-bg-secondary/10 rounded-xl transition-all cursor-pointer"
          >
            <Edit3 size={18} />
          </Link>
          <button
            title="Archive Story"
            className="p-3 md:p-2.5 text-foreground/50 hover:text-accent-primary hover:bg-accent-primary/10 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed disabled:hover:text-accent-primary/50"
            onClick={() =>
              archiveRef.current?.open({
                mode: "info",
                message: `This will archive the content of <strong style='color: white!important'>${story.title}</strong>`,
              })
            }
            disabled={story.status === "archived"}
          >
            <Archive size={18} />
          </button>
          <div className="h-6 w-[1px] bg-border mx-1" />
          <button
            title="Delete Story"
            onClick={() =>
              deleteRef.current?.open({
                mode: "delete",
                message: `This will delete all contents and data of <strong  style='color: white!important'>${story.title}</strong>`,
                fields: [
                  {
                    name: "delete",
                    label: `Type <strong style='color: white!important'>${story.title}</strong> to confirm deletion`,
                    type: "text",
                    required: true,
                    match: story.title,
                  },
                ],
                data: story,
              })
            }
            className="p-3 md:p-2.5 text-foreground/50 hover:text-red-500 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <ActionModal
        ref={deleteRef}
        onConfirm={() => deleteStory.mutateAsync()}
      />
      <ActionModal
        ref={archiveRef}
        onConfirm={() => archiveStory.mutateAsync()}
      />
    </React.Fragment>
  );
}
