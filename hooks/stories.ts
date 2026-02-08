import { stories } from "@/app/generated/prisma/client";
import { api } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

interface StoryFilters {
  topics?: string[];
  sort?: string;
  time?: string;
}

type StoryData = Omit<
  stories,
  | "content"
  | "status"
  | "completion_rate"
  | "author_id"
  | "series"
  | "series_id"
  | "order_in_series"
  | "updated_at"
>;

type StoryResonse = ApiResponse<
  StoryData,
  { pagination: Pagination; filter: Filter }
>;

export const useStoriesInfinite = (filters: StoryFilters) => {
  return useInfiniteQuery({
    queryKey: ["stories", "infinite", filters],
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        page: pageParam.toString(),
        sort: filters.sort || "newest",
        time: filters.time || "all",
      });

      if (filters.topics && filters.topics.length > 0) {
        params.append("topics", filters.topics.join(","));
      }

      const { data } = await api.get<StoryResonse>(
        `/stories?${params.toString()}`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { has_next_page, current_page } = lastPage.meta?.pagination!;
      return has_next_page ? current_page + 1 : undefined;
    },
    placeholderData: (previousData) => previousData,
  });
};
