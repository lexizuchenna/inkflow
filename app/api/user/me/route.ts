import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { User, Earning, Story } from "@/entities/";

export async function GET() {
  try {
    const { userId: clerk_id } = await auth();

    if (!clerk_id) {
      return NextResponse.json(
        {
          error: "UNAUTHORIZED",
          message: "You must be logged in to access this data",
          statusCode: 401,
        },
        { status: 401 }
      );
    }

    await initializeDatabase();
    const user_repo = AppDataSource.getRepository(User);
    const earning_repo = AppDataSource.getRepository(Earning);
    const story_repo = AppDataSource.getRepository(Story);

    const [user, revenue_result, story_metrics] = await Promise.all([
      user_repo.findOne({
        where: { clerk_id },
        relations: ["stories"],
      }),
      earning_repo
        .createQueryBuilder("earning")
        .select("SUM(earning.amount)", "total")
        .where(
          "earning.writer_id = (SELECT id FROM users WHERE clerk_id = :clerk_id)",
          { clerk_id }
        )
        .getRawOne(),
      story_repo
        .createQueryBuilder("story")
        .select("SUM(story.view_count)", "total_reads")
        .addSelect("AVG(story.reading_time)", "avg_reading_time")
        .where(
          "story.author_id = (SELECT id FROM users WHERE clerk_id = :clerk_id)",
          { clerk_id }
        )
        .getRawOne(),
    ]);

    if (!user) {
      return NextResponse.json(
        {
          error: "NOT_FOUND",
          message: "User profile not found",
          statusCode: 404,
        },
        { status: 404 }
      );
    }

    const total_revenue = parseFloat(revenue_result?.total || "0");
    const total_reads = parseInt(story_metrics?.total_reads || "0", 10);
    const avg_reading_time = parseFloat(
      parseFloat(story_metrics?.avg_reading_time || "0").toFixed(1)
    );

    return NextResponse.json(
      {
        data: {
          ...user,
          total_revenue,
          total_reads,
          avg_reading_time,
        },
        message: "User profile and analytics retrieved successfully",
        statusCode: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("▲ [GET_USER_ERROR]:", error);

    return NextResponse.json(
      {
        error: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user analytics",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
