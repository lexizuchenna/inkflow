import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stories_status_enum } from "@/app/generated/prisma/enums";

export async function GET() {
  const stories = await prisma.stories.findMany({
    where: { status: stories_status_enum.published },
    select: { title: true, slug: true },
    orderBy: { updated_at: "desc" },
  });

  return NextResponse.json({ data: stories });
}
