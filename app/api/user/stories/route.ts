import slugify from "slugify";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { AppDataSource, initializeDatabase } from "@/lib/db";
import { StoryStatus } from "@/entities/story.entity";
import { User, Story } from "@/entities";
import { generateExcerpt } from "@/utils/generate-excerpt";
import { validateStoryData } from "@/utils/story";

export async function GET(req: Request) {
  try {
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

    await initializeDatabase();
    const user_repo = AppDataSource.getRepository(User);
    const story_repo = AppDataSource.getRepository(Story);

    const user = await user_repo.findOne({ where: { clerk_id } });
    if (!user) {
      return NextResponse.json(
        { error: "NOT_FOUND", message: "User record missing", statusCode: 404 },
        { status: 404 }
      );
    }

    const [stories, totalCount] = await story_repo.findAndCount({
      where: { author_id: user.id },
      order: { created_at: "DESC" }, // Newest first
      take: limit,
      skip: skip,
      relations: ["series"], // Optional: include series info if needed
    });

    const totalPages = Math.ceil(totalCount / limit);

    // 4. Return standardized response
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
  } catch (error: any) {
    console.error("▲ [GET_USER_STORIES_ERROR]:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_SERVER_ERROR",
        message: error.message,
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId: clerk_id } = await auth();

    if (!clerk_id) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Login required", statusCode: 401 },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      title,
      content,
      category,
      featured_image,
      status,
      tags,
      series_id,
    } = body;

    const { isValid, errors } = validateStoryData(body);

    if (!isValid)
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: errors[0],
          statusCode: 400,
        },
        { status: 400 }
      );

    await initializeDatabase();
    const user_repo = AppDataSource.getRepository(User);
    const story_repo = AppDataSource.getRepository(Story);

    const user = await user_repo.findOne({ where: { clerk_id } });
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

    const story = story_repo.create({
      title,
      content,
      excerpt: generateExcerpt(content),
      featured_image,
      slug: uniqueSlug,
      status:
        status === "published" ? StoryStatus.PUBLISHED : StoryStatus.DRAFT,
      tags: tags.length
        ? tags.map((t: string) => t.toLowerCase())
        : [category.toLowerCase()],
      author: user,
      reading_time: readingTime,
      series_id: series_id || null,
      category,
    });

    const savedStory = await story_repo.save(story);

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
  } catch (error: any) {
    console.error("▲ [CREATE_STORY_ERROR]:", error);
    return NextResponse.json(
      {
        error: "INTERNAL_SERVER_ERROR",
        message: error.message,
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
