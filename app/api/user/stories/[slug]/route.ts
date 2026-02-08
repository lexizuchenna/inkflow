import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { validateStoryData } from "@/utils/story";
import { withErrorHandling } from "@/lib/api-handler";
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "@/exceptions";

export const GET = withErrorHandling(
  async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { userId: clerk_id } = await auth();

    if (!clerk_id) throw new UnauthorizedException("Login required");

    const story = await prisma.stories.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            display_name: true,
            username: true,
            avatar_url: true,
            bio: true,
          },
        },
        series: true,
      },
    });

    if (!story) throw new NotFoundException("Story not found");

    return NextResponse.json({
      data: story,
      message: "Story retrieved successfully",
      statusCode: 200,
    });
  }
);

export const PATCH = withErrorHandling(
  async (req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { userId: clerk_id } = await auth();
    const { slug } = await params;

    if (!clerk_id) throw new UnauthorizedException("Login required");

    const body = await req.json();

    const user = await prisma.users.findUnique({ where: { clerk_id } });
    if (!user) throw new NotFoundException("User record missing");

    const story = await prisma.stories.findUnique({
      where: { slug },
      select: { author_id: true, id: true },
    });

    if (!story) throw new NotFoundException("Story not found");
    if (story.author_id !== user.id)
      throw new ForbiddenException("You do not own this story");

    const { isValid, errors } = validateStoryData(body);
    if (!isValid) throw new BadRequestException(errors[0]);

    const updatedStory = await prisma.stories.update({
      where: { slug },
      data: {
        title: body.title,
        content: body.content,
        featured_image: body.featured_image,
        category: body.category,
        tags: body.tags?.length ? body.tags : [body.category.toLowerCase()],
        series_id: body.series_id || null,
        status: body.status,
      },
    });

    return NextResponse.json({
      data: updatedStory,
      message: "Story updated successfully",
      statusCode: 200,
    });
  }
);

export const DELETE = withErrorHandling(
  async (_req: Request, { params }: { params: Promise<{ slug: string }> }) => {
    const { userId: clerk_id } = await auth();
    const { slug } = await params;

    if (!clerk_id) throw new UnauthorizedException();

    const user = await prisma.users.findUnique({ where: { clerk_id } });
    if (!user) throw new NotFoundException("User account");

    const story = await prisma.stories.findUnique({
      where: { slug },
      select: {
        id: true,
        author_id: true,
        series_id: true,
        order_in_series: true,
      },
    });

    if (!story) throw new NotFoundException("Story");
    if (story.author_id !== user.id)
      throw new ForbiddenException("Not authorized");

    // Prisma 7 Interactive Transaction
    await prisma.$transaction(async (tx) => {
      await tx.stories.delete({ where: { id: story.id } });

      if (story.series_id && story.order_in_series !== null) {
        await tx.stories.updateMany({
          where: {
            series_id: story.series_id,
            order_in_series: { gt: story.order_in_series },
          },
          data: {
            order_in_series: { decrement: 1 },
          },
        });
      }
    });

    return NextResponse.json({
      statusCode: 200,
      message: "Story deleted",
      data: { slug },
    });
  }
);
