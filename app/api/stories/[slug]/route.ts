import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story, StoryStatus } from "@/entities/story.entity";
import { withErrorHandling } from "@/lib/api-handler";
import { Not } from "typeorm";

export const GET = withErrorHandling(
  async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    await initializeDatabase();
    const story_repo = AppDataSource.getRepository(Story);

    const story = await story_repo.findOne({
      where: { slug, status: StoryStatus.PUBLISHED },
      relations: ["author", "series"],
    });

    if (!story) {
      return NextResponse.json(
        { statusCode: 404, message: "Story not found" },
        { status: 404 }
      );
    }

    story.view_count += 1;
    await story_repo.save(story);

    let series_navigation = null;
    if (story.series_id) {
      const [prev, next] = await Promise.all([
        story_repo.findOne({
          where: {
            series_id: story.series_id,
            order_in_series: story.order_in_series - 1,
          },
          select: { id: true, title: true, slug: true },
        }),
        story_repo.findOne({
          where: {
            series_id: story.series_id,
            order_in_series: story.order_in_series + 1,
          },
          select: { id: true, title: true, slug: true },
        }),
      ]);
      series_navigation = { previous: prev, next: next };
    }

    const related_posts = await story_repo.find({
      where: {
        category: story.category,
        id: Not(story.id),
        status: StoryStatus.PUBLISHED,
      },
      take: 3,
      order: { created_at: "DESC" },
      relations: ["author"],
      select: {
        id: true,
        title: true,
        slug: true,
        featured_image: true,
        created_at: true,
        author: { id: true, display_name: true, avatar_url: true },
      },
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Story retrieved successfully",
      data: {
        story: { ...story },
        series_navigation,
        related_posts,
      },
    });
  }
);
