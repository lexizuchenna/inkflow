import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandling } from "@/lib/api-handler";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-inkflow-secret";
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      `${NEXT_PUBLIC_APP_URL}/?error=true&msg=missing_token`
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
    const email = decoded.email;

    await prisma.emails.upsert({
      where: { email },
      update: { is_subscribed: true },
      create: {
        email,
        is_subscribed: true,
      },
    });

    return NextResponse.redirect(
      `${NEXT_PUBLIC_APP_URL}/?success=true&msg=email_verified`
    );
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return NextResponse.redirect(
        `${NEXT_PUBLIC_APP_URL}/?error=true&msg=token_expired`
      );
    }

    return NextResponse.redirect(
      `${NEXT_PUBLIC_APP_URL}/?error=true&msg=invalid_token`
    );
  }
});
