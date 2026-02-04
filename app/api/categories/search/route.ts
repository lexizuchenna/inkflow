import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story } from "@/entities/story.entity";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase() || "";

    await initializeDatabase();
    const story_repo = AppDataSource.getRepository(Story);

    const categories = await story_repo
      .createQueryBuilder("story")
      .select("DISTINCT(story.category)", "category")
      .where("LOWER(story.category) LIKE :query", { query: `%${query}%` })
      .andWhere("story.status = :status", { status: "published" })
      .limit(10)
      .getRawMany();

    console.log(categories);

    const result = categories.map((c) => c.category);

    return NextResponse.json(
      { data: result, message: "", status: 200 },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
