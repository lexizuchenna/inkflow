import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import { stories_status_enum } from "@/app/generated/prisma/client";

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const categories = await prisma.stories.groupBy({
    by: ["category"],
    where: {
      status: stories_status_enum.published,
      category: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    orderBy: { category: "asc" },
  });

  const result = categories.map((c) => c.category);

  return NextResponse.json(
    { data: result, message: "Categories retrieved", status: 200 },
    { status: 200 }
  );
});
