import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import { stories_status_enum } from "@/app/generated/prisma/client";

export const GET = withErrorHandling(
  async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;

    const story = await prisma.stories.update({
      where: {
        slug,
        status: stories_status_enum.published,
      },
      data: {
        view_count: { increment: 1 },
      },
      include: {
        author: true,
        series: true,
      },
    });

    if (!story) {
      return NextResponse.json(
        { statusCode: 404, message: "Story not found" },
        { status: 404 }
      );
    }

    let series_navigation = null;
    if (story.series_id) {
      const [prev, next] = await Promise.all([
        prisma.stories.findFirst({
          where: {
            series_id: story.series_id,
            order_in_series: (story.order_in_series || 0) - 1,
            status: stories_status_enum.published,
          },
          select: { id: true, title: true, slug: true },
        }),
        prisma.stories.findFirst({
          where: {
            series_id: story.series_id,
            order_in_series: (story.order_in_series || 0) + 1,
            status: stories_status_enum.published,
          },
          select: { id: true, title: true, slug: true },
        }),
      ]);
      series_navigation = { previous: prev, next: next };
    }

    const related_posts = await prisma.stories.findMany({
      where: {
        category: story.category,
        id: { not: story.id },
        status: stories_status_enum.published,
      },
      take: 3,
      orderBy: { created_at: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        featured_image: true,
        created_at: true,
        author: {
          select: { id: true, display_name: true, avatar_url: true },
        },
      },
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Story retrieved successfully",
      data: {
        story,
        series_navigation,
        related_posts,
      },
    });
  }
);
