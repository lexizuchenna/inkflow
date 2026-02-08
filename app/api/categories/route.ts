import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import slugify from "slugify";

export const GET = withErrorHandling(async () => {
  const categories = await prisma.stories.groupBy({
    by: ["category"],
    where: {
      status: "published",
      category: {
        not: "",
      },
    },
    _count: {
      id: true,
    },
    orderBy: {
      _count: {
        id: "desc",
      },
    },
  });

  const formattedCategories = categories.map((cat) => ({
    name: cat.category,
    count: cat._count.id,
    slug: slugify(cat.category),
  }));

  return NextResponse.json({
    statusCode: 200,
    message: "Categories retrieved successfully",
    data: formattedCategories,
  });
});
