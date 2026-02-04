import { Series, User, Story } from "@/entities";

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

  interface BlogPost {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    featured_image: string;
    status: "archived" | "published" | "draft";
    view_count: number;
    like_count: number;
    reading_time: number;
    completion_rate: number;
    author: User;
    author_id: string;
    series?: Series;
    series_id?: string;
    order_in_series?: number;
    tags: Array<string>;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
  }

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

  interface GetStoryResponse {
    story: Story;
    series_navigation: { previous: Story | null; next: Story | null } | null;
    related_posts: Array<Story>;
  }

  type IUser = Pick<
    User,
    "display_name" | "username" | "avatar_url" | "role",
    "bio"
  >;

  interface GetHomeDataRes {
    featured: Story;
    top_stories: Array<Story>;
    trending_stories: Array<Story>;
    top_authors: Array<IUser>;
  }

  type CategoriesRes = Array<{
    name: string;
    count: number;
    slug: string;
  }>;
}
