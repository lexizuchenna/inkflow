import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import { stories_status_enum } from "@/app/generated/prisma/client";

export const GET = withErrorHandling(async () => {
  const [
    featured_story,
    top_stories,
    trending_stories,
    top_authors_aggregation,
  ] = await Promise.all([
    prisma.stories.findFirst({
      where: { status: stories_status_enum.published },
      orderBy: [{ view_count: "desc" }, { created_at: "desc" }],
      include: { author: true },
    }),

    prisma.stories.findMany({
      where: { status: stories_status_enum.published },
      orderBy: { view_count: "desc" },
      take: 3,
      include: { author: true },
    }),

    prisma.stories.findMany({
      where: { status: stories_status_enum.published },
      orderBy: [{ created_at: "desc" }, { view_count: "desc" }],
      take: 5,
      include: { author: true },
    }),

    prisma.stories.groupBy({
      by: ["author_id"],
      where: { status: stories_status_enum.published },
      _sum: { view_count: true },
      orderBy: {
        _sum: {
          view_count: "desc",
        },
      },
      take: 3,
    }),
  ]);

  const top_authors = await Promise.all(
    top_authors_aggregation.map(async (agg) => {
      const user = await prisma.users.findUnique({
        where: { id: agg.author_id },
        select: {
          id: true,
          display_name: true,
          username: true,
          avatar_url: true,
          role: true,
        },
      });
      return {
        ...user,
        total_views: agg._sum.view_count || 0,
      };
    })
  );

  return NextResponse.json({
    statusCode: 200,
    message: "Homepage data retrieved successfully",
    data: {
      featured: featured_story,
      top_stories,
      trending_stories,
      top_authors,
    },
  });
});
