import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Story } from "@/entities/story.entity";
import { User } from "@/entities";
import { validateStoryData } from "@/utils/story";
import { withErrorHandling } from "@/lib/api-handler";
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "@/exceptions";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { userId: clerk_id } = await auth();

    if (!clerk_id) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Login required", statusCode: 401 },
        { status: 401 }
      );
    }

    if (!slug) {
      return NextResponse.json(
        { error: "BAD_REQUEST", message: "Slug is required", statusCode: 400 },
        { status: 400 }
      );
    }

    await initializeDatabase();
    const story_repo = AppDataSource.getRepository(Story);

    const story = await story_repo.findOne({
      where: { slug },
      relations: ["author", "series"],
    });

    if (!story) {
      return NextResponse.json(
        { error: "NOT_FOUND", message: "Story not found", statusCode: 404 },
        { status: 404 }
      );
    }

    const { author, ...storyData } = story;
    const sanitizedAuthor = {
      id: author.id,
      display_name: author.display_name,
      username: author.username,
      avatar_url: author.avatar_url,
      bio: author.bio,
    };

    return NextResponse.json(
      {
        data: { ...storyData, author: sanitizedAuthor },
        message: "Story retrieved successfully",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("▲ [GET_STORY_BY_SLUG_ERROR]:", error);
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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { userId: clerk_id } = await auth();
    const { slug } = await params;

    if (!clerk_id) {
      return NextResponse.json(
        { error: "UNAUTHORIZED", message: "Login required", statusCode: 401 },
        { status: 401 }
      );
    }

    const body = await req.json();
    await initializeDatabase();

    const story_repo = AppDataSource.getRepository(Story);
    const user_repo = AppDataSource.getRepository(User);

    const user = await user_repo.findOne({ where: { clerk_id } });
    if (!user) {
      return NextResponse.json(
        { error: "USER_NOT_FOUND", status: 404 },
        { status: 404 }
      );
    }

    const story = await story_repo.findOne({
      where: { slug },
      relations: ["author"],
    });

    if (!story) {
      return NextResponse.json(
        { error: "STORY_NOT_FOUND", status: 404 },
        { status: 404 }
      );
    }

    if (story.author.id !== user.id) {
      return NextResponse.json(
        {
          error: "FORBIDDEN",
          message: "You do not own this story",
          statusCode: 403,
        },
        { status: 403 }
      );
    }

    const { isValid, errors } = validateStoryData(body);

    console.log("up", body.status);

    if (!isValid)
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: errors[0],
          statusCode: 400,
        },
        { status: 400 }
      );

    story_repo.merge(story, {
      title: body.title,
      content: body.content,
      featured_image: body.featured_image,
      category: body.category,
      tags: body.tags.length ? body.tags : [body.category.toLowerCase()],
      series_id: body.series_id,
      status: body.status,
    });

    const updatedStory = await story_repo.save(story);

    return NextResponse.json(
      {
        data: updatedStory,
        message: "Story updated successfully",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("▲ [UPDATE_STORY_ERROR]:", error);
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

export const DELETE = withErrorHandling(
  async (_req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { userId: clerk_id } = await auth();
    const { slug } = await params;

    if (!clerk_id) throw new UnauthorizedException();

    await initializeDatabase();

    // 1. Setup Runner
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user_repo = queryRunner.manager.getRepository(User);
      const story_repo = queryRunner.manager.getRepository(Story);

      const user = await user_repo.findOne({ where: { clerk_id } });
      if (!user) throw new NotFoundException("User account");

      const story = await story_repo.findOne({
        where: { slug },
        relations: ["author"],
      });

      if (!story) throw new NotFoundException("Story");
      if (story.author.id !== user.id) throw new ForbiddenException("...");

      const seriesId = story.series_id;
      const deletedOrder = story.order_in_series;

      // 2. Execute Writes
      await story_repo.remove(story);

      if (seriesId && deletedOrder !== null) {
        await story_repo
          .createQueryBuilder()
          .update(Story)
          .set({ order_in_series: () => "order_in_series - 1" })
          .where("series_id = :seriesId", { seriesId })
          .andWhere("order_in_series > :deletedOrder", { deletedOrder })
          .execute();
      }

      // 3. COMMIT BEFORE RETURNING
      await queryRunner.commitTransaction();

      // We don't return inside the try block to avoid finally/commit race conditions
    } catch (err: any) {
      // 4. CHECK ACTIVITY BEFORE ROLLBACK
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    } finally {
      // 5. ALWAYS RELEASE
      await queryRunner.release();
    }

    // 6. RETURN SUCCESS OUTSIDE THE TRY/CATCH/FINALLY
    return NextResponse.json({
      statusCode: 200,
      message: "Story deleted",
      data: { slug },
    });
  }
);
