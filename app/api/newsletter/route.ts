import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import send_mail from "@/lib/nodemailer";
import { AppDataSource, initializeDatabase } from "@/lib/db";
import { Email } from "@/entities/email.entity";
import { withErrorHandling } from "@/lib/api-handler";
import { newsletter_email } from "@/templates/newsletter";
import { ConflictException, InternalServerException } from "@/exceptions";

const JWT_SECRET = process.env.JWT_SECRET || "your-inkflow-secret";

export const POST = withErrorHandling(async (req: Request) => {
  const { email } = await req.json();
  const normalizedEmail = email.toLowerCase().trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { statusCode: 400, message: "Valid email required" },
      { status: 400 }
    );
  }

  await initializeDatabase();
  const emailRepo = AppDataSource.getRepository(Email);

  const existingEmail = await emailRepo.findOne({
    where: { email: normalizedEmail },
  });

  if (existingEmail && existingEmail.is_subscribed)
    throw new ConflictException("You are already subscribed to inkflow");

  const token = jwt.sign({ email: normalizedEmail }, JWT_SECRET, {
    expiresIn: "24h",
  });

  const verification_url = `${process.env.NEXT_PUBLIC_API_URL}/newsletter/verify?token=${token}`;

  const { status, error } = await send_mail({
    to: email,
    html: newsletter_email({ verification_url }),
  });

  if (status !== 200)
    throw new InternalServerException(
      error?.message || "Something went wrong, try again"
    );

  return NextResponse.json({
    statusCode: 200,
    message: "Verification email sent! Please check your inbox to confirm.",
  });
});
