import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story, StoryStatus } from "@/entities/story.entity";

export async function GET() {
  await initializeDatabase();
  const storyRepo = AppDataSource.getRepository(Story);

  const stories = await storyRepo.find({
    where: { status: StoryStatus.PUBLISHED },
    select: ["slug", "updated_at"],
    order: { updated_at: "DESC" },
  });

  return NextResponse.json({ data: stories });
}
