import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story, StoryStatus } from "@/entities/story.entity";
import { User } from "@/entities/user.entity";
import { withErrorHandling } from "@/lib/api-handler";

export const GET = withErrorHandling(async () => {
  await initializeDatabase();
  const storyRepo = AppDataSource.getRepository(Story);
  const userRepo = AppDataSource.getRepository(User);

  const featured_story = await storyRepo.findOne({
    where: { status: StoryStatus.PUBLISHED },
    order: { view_count: "DESC", created_at: "DESC" },
    relations: ["author"],
  });

  const top_stories = await storyRepo.find({
    where: { status: StoryStatus.PUBLISHED },
    order: { view_count: "DESC" },
    take: 3,
    relations: ["author"],
  });

  const trending_stories = await storyRepo.find({
    where: { status: StoryStatus.PUBLISHED },
    order: { created_at: "DESC", view_count: "DESC" },
    take: 5,
    relations: ["author"],
  });

  const top_authors = await userRepo
    .createQueryBuilder("user")
    .leftJoin("user.stories", "story")
    .select([
      "user.id",
      "user.display_name",
      "user.username",
      "user.avatar_url",
      "user.role",
    ])
    .addSelect("SUM(story.view_count)", "total_views")
    .where("story.status = :status", { status: StoryStatus.PUBLISHED })
    .groupBy("user.id")
    .orderBy("total_views", "DESC")
    .take(3)
    .getMany();

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
