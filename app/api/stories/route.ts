import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import { subDays, subMonths, startOfDay } from "date-fns";
import { stories_status_enum } from "@/app/generated/prisma/enums";

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = 10;
  const skip = (page - 1) * limit;

  const topics = searchParams.get("topics")?.split(",").filter(Boolean);
  const sortBy = searchParams.get("sort") || "newest";
  const timeRange = searchParams.get("time") || "all";

  const where: any = {
    status: stories_status_enum.published,
  };

  if (topics && topics.length > 0) {
    where.category = { in: topics };
  }

  if (timeRange !== "all") {
    let dateLimit = new Date();
    if (timeRange === "today") dateLimit = startOfDay(new Date());
    if (timeRange === "week") dateLimit = subDays(new Date(), 7);
    if (timeRange === "month") dateLimit = subMonths(new Date(), 1);

    where.created_at = { gte: dateLimit };
  }

  let orderBy: any = { created_at: "desc" };
  if (sortBy === "most_viewed") orderBy = { view_count: "desc" };
  if (sortBy === "highest_rated") orderBy = { like_count: "desc" };

  const [stories, total] = await Promise.all([
    prisma.stories.findMany({
      where,
      take: limit,
      skip: skip,
      orderBy,
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
          select: {
            id: true,
            display_name: true,
            username: true,
            avatar_url: true,
          },
        },
      },
    }),
    prisma.stories.count({ where }),
  ]);

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
