import slugify from "slugify";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import { stories_status_enum } from "@/app/generated/prisma/client";
import { generateExcerpt } from "@/utils/generate-excerpt";
import { validateStoryData } from "@/utils/story";

export const GET = withErrorHandling(async (req: Request) => {
  const { userId: clerk_id } = await auth();

  if (!clerk_id) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Login required", statusCode: 401 },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const limit = 10;
  const skip = (page - 1) * limit;

  const user = await prisma.users.findUnique({ where: { clerk_id } });
  if (!user) {
    return NextResponse.json(
      { error: "NOT_FOUND", message: "User record missing", statusCode: 404 },
      { status: 404 }
    );
  }

  const [stories, totalCount] = await Promise.all([
    prisma.stories.findMany({
      where: { author_id: user.id },
      orderBy: { created_at: "desc" },
      take: limit,
      skip: skip,
      include: { series: true },
    }),
    prisma.stories.count({
      where: { author_id: user.id },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json(
    {
      data: stories,
      meta: {
        total_items: totalCount,
        total_pages: totalPages,
        current_page: page,
        per_page: limit,
        has_next_page: page < totalPages,
        has_previous_page: page > 1,
      },
      message: "Stories retrieved successfully",
      status: 200,
    },
    { status: 200 }
  );
});

export const POST = withErrorHandling(async (req: Request) => {
  const { userId: clerk_id } = await auth();

  if (!clerk_id) {
    return NextResponse.json(
      { error: "UNAUTHORIZED", message: "Login required", statusCode: 401 },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { title, content, category, featured_image, status, tags, series_id } =
    body;

  const { isValid, errors } = validateStoryData(body);

  if (!isValid) {
    return NextResponse.json(
      {
        error: "VALIDATION_ERROR",
        message: errors[0],
        statusCode: 400,
      },
      { status: 400 }
    );
  }

  const user = await prisma.users.findUnique({ where: { clerk_id } });
  if (!user) {
    return NextResponse.json(
      { error: "NOT_FOUND", message: "User record missing", statusCode: 404 },
      { status: 404 }
    );
  }

  const baseSlug = slugify(title, { lower: true, strict: true });
  const uniqueSlug = `${baseSlug}-${Math.random()
    .toString(36)
    .substring(2, 7)}`;

  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const savedStory = await prisma.stories.create({
    data: {
      title,
      content,
      excerpt: generateExcerpt(content),
      featured_image,
      slug: uniqueSlug,
      status:
        status === "published"
          ? stories_status_enum.published
          : stories_status_enum.draft,
      tags:
        tags && tags.length
          ? tags.map((t: string) => t.toLowerCase())
          : [category.toLowerCase()],
      reading_time: readingTime,
      category,
      author_id: user.id,
      series_id: series_id || null,
    },
  });

  return NextResponse.json(
    {
      data: savedStory,
      message:
        status === "published"
          ? "Story published!"
          : "Draft saved successfully",
      status: 201,
    },
    { status: 201 }
  );
});
