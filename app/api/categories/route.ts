import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story, StoryStatus } from "@/entities/story.entity";
import { withErrorHandling } from "@/lib/api-handler";
import slugify from "slugify";

export const GET = withErrorHandling(async () => {
  await initializeDatabase();
  const storyRepo = AppDataSource.getRepository(Story);

  const categories = await storyRepo
    .createQueryBuilder("story")
    .select("story.category", "name")
    .addSelect("COUNT(story.id)", "postCount")
    .where("story.status = :status", { status: StoryStatus.PUBLISHED })
    .andWhere("story.category IS NOT NULL")
    .groupBy("story.category")
    .orderBy("COUNT(story.id)", "DESC")
    .getRawMany();

  const formattedCategories = categories.map((cat) => ({
    name: cat.name,
    count: parseInt(cat.postCount, 10),
    slug: slugify(cat.name),
  }));

  return NextResponse.json({
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: formattedCategories,
  });
});
