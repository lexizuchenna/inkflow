import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/story/:path*",
  "/explore(.*)",
  "/trending(.*)",
  "/categories(.*)",
  "/api/webhook/clerk(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/home(.*)",
  "/api/categories(.*)",
  "/api/stories(.*)",
  "/api/stories/:path*",
  "/api/og(.*)",
  "/api/newsletter(.*)",
]);

const isWriterRoute = createRouteMatcher([
  "/writer/(.*)",
  "/write(.*)",
  "/api/user/stories(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  if (isWriterRoute(request)) {
    const session = await auth();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
