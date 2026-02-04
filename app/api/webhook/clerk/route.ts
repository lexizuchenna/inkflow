import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

import { AppDataSource, initializeDatabase } from "@/lib/db";
import { UserRole } from "@/entities/user.entity";
import { Email, User } from "@/entities";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", { status: 400 });
  }

  await initializeDatabase();
  const user_repo = AppDataSource.getRepository(User);
  const email_repo = AppDataSource.getRepository(Email);

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { email_addresses, image_url, first_name, last_name, username } =
      evt.data;
    const email = email_addresses[0].email_address;

    const existingUser = await user_repo.findOne({
      where: [{ clerk_id: id }, { email: email }],
    });

    if (existingUser) {
      console.log(`User ${id} already exists, skipping creation.`);
      return new Response("User already exists", { status: 200 });
    }

    const newUser = user_repo.create({
      clerk_id: id,
      email: email,
      username: username || `user_${Math.random().toString(36).slice(2, 7)}`,
      display_name: `${first_name || ""} ${last_name || ""}`.trim(),
      avatar_url: image_url,
      role: UserRole.WRITER,
    });
    const subscriber = email_repo.create({
      email: newUser.email,
      is_subscribed: true,
    });

    await Promise.all([user_repo.save(newUser), email_repo.save(subscriber)]);
  }

  if (eventType === "user.updated") {
    const { image_url, first_name, last_name, username } = evt.data;

    await user_repo.update(
      { clerk_id: id },
      {
        avatar_url: image_url,
        display_name: `${first_name || ""} ${last_name || ""}`.trim(),
        username: username || undefined,
      }
    );
    console.log(`User ${id} updated in DB`);
  }

  if (eventType === "user.deleted") {
    await user_repo.delete({ clerk_id: id });
    console.log(`User ${id} deleted from DB`);
  }

  return new Response("", { status: 200 });
}
