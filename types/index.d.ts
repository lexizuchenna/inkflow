import type { users, stories } from "@/app/generated/prisma/client";
export {};

declare global {
  interface ApiResponse<T, U = unknown> {
    data: T;
    meta?: U;
    message?: string;
    statusCode: number;
  }

  interface ApiError {
    error: string;
    message: string;
    statusCode: number;
  }

  interface Pagination {
    total_items: number;
    total_pages: number;
    current_page: number;
    per_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  }

  interface Filter {
    applied_topics: Array<string>;
    applied_sort: string;
    applied_time: string;
  }

  export type Sort = "newest" | "most_viewed" | "highest_rated";

  export type TimeRange = "today" | "week" | "month" | "all";

  type BlogPost = Exclude<stories, "id"> & { author: users };

  interface ActionModalOptions {
    mode: "default" | "delete" | "info" | "success";
    title?: string;
    message?: string;
    confirmText?: string;
    fields?: Array<{
      name: string;
      label: string;
      type: string;
      required: boolean;
      match?: string;
    }>;
    data?: any;
  }

  interface StoryData extends stories {
    author: users;
  }

  interface GetStoryResponse {
    story: StoryData;
    series_navigation: {
      previous: StoryData | null;
      next: StoryData | null;
    } | null;
    related_posts: Array<StoryData>;
  }

  interface IUser {
    display_name: string;
    username: string;
    avatar_url?: string;
    role: string;
    bio?: string;
  }

  interface GetHomeDataRes {
    featured: StoryData;
    top_stories: Array<stories>;
    trending_stories: Array<stories>;
    top_authors: Array<IUser>;
  }

  type CategoriesRes = Array<{
    name: string;
    count: number;
    slug: string;
  }>;
}
