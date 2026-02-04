import { useQuery } from "@tanstack/react-query";

import { userService } from "@/services/user/user";
import { storyService } from "@/services/story";

export const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: async () => userService.getMe(),
    retry: 1,
  });

export const useStories = (page = 1) =>
  useQuery({
    queryKey: ["user-stories", page],
    queryFn: async () => storyService.getStories(),
    retry: 1,
  });

export const useStory = (slug: string) =>
  useQuery({
    queryKey: ["story", slug],
    queryFn: async () => storyService.getStory(slug),
    retry: 1,
  });
