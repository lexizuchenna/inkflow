import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";

export const GET = withErrorHandling(async () => {
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

  const user = await prisma.users.findUnique({
    where: { clerk_id },
    include: {
      stories: { select: { id: true, slug: true } },
    },
  });

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

  const [revenue_result, story_metrics] = await Promise.all([
    prisma.earnings.aggregate({
      where: { writer_id: user.id },
      _sum: {
        amount: true,
      },
    }),
    prisma.stories.aggregate({
      where: { author_id: user.id },
      _sum: {
        view_count: true,
      },
      _avg: {
        reading_time: true,
      },
    }),
  ]);

  const total_revenue = Number(revenue_result._sum.amount || 0);
  const total_reads = story_metrics._sum.view_count || 0;
  const avg_reading_time = Number(
    (story_metrics._avg.reading_time || 0).toFixed(1)
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
});
