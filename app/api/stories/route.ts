import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story, StoryStatus } from "@/entities/story.entity";
import { withErrorHandling } from "@/lib/api-handler";
import {
  In,
  MoreThanOrEqual,
  FindOptionsOrder,
  FindOptionsWhere,
} from "typeorm";
import { subDays, subMonths, startOfDay } from "date-fns";

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 10;
  const skip = (page - 1) * limit;

  const topics = searchParams.get("topics")?.split(",").filter(Boolean);
  const sortBy = searchParams.get("sort") || "newest";
  const timeRange = searchParams.get("time") || "all";

  await initializeDatabase();
  const story_repo = AppDataSource.getRepository(Story);

  const where: FindOptionsWhere<Story> = {
    status: StoryStatus.PUBLISHED,
  };

  if (topics && topics.length > 0) {
    where.category = In(topics);
  }

  if (timeRange !== "all") {
    let dateLimit = new Date();
    if (timeRange === "today") dateLimit = startOfDay(new Date());
    if (timeRange === "week") dateLimit = subDays(new Date(), 7);
    if (timeRange === "month") dateLimit = subMonths(new Date(), 1);

    where.created_at = MoreThanOrEqual(dateLimit);
  }

  let order: FindOptionsOrder<Story> = { created_at: "DESC" };
  if (sortBy === "most_viewed") order = { view_count: "DESC" };
  if (sortBy === "highest_rated") order = { like_count: "DESC" };

  const [stories, total] = await story_repo.findAndCount({
    where,
    relations: ["author"],
    order,
    take: limit,
    skip: skip,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featured_image: true,
      category: true,
      created_at: true,
      view_count: true,
      like_count: true,
      author: {
        id: true,
        display_name: true,
        username: true,
        avatar_url: true,
      },
    },
  });

  const total_pages = Math.ceil(total / limit);

  return NextResponse.json({
    statusCode: 200,
    message: "Stories filtered successfully",
    data: stories,
    meta: {
      pagination: {
        total_items: total,
        total_pages,
        current_page: page,
        per_page: limit,
        has_next_page: page < total_pages,
        has_previous_page: page > 1,
      },
      filters: {
        applied_topics: topics || [],
        applied_sort: sortBy,
        applied_time: timeRange,
      },
    },
  });
});
