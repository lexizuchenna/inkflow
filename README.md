# InkFlow API

## Overview

InkFlow is a professional content publishing engine built with a TypeScript-based Node.js environment utilizing the Next.js 15 App Router for server-side logic and TypeORM for robust PostgreSQL database management. It handles complex editorial workflows, user analytics, and high-performance content delivery.

## Features

- **TypeORM**: Object-relational mapping for PostgreSQL with strictly typed entities (User, Story, Series, Earning, Payment).
- **Clerk Auth**: Secure identity management and session protection for writer and reader roles.
- **Supabase Storage**: Integrated file upload system for high-resolution featured images and assets.
- **Tiptap Editor**: Rich-text content processing with custom extensions for editorial-grade publishing.
- **Svix**: Secure webhook verification for real-time user data synchronization.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Initialize the database and run development server:
   ```bash
   pnpm dev
   ```

### Environment Variables

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=....
CLERK_SECRET_KEY=....

NEXT_PUBLIC_SUPABASE_URL=....

SUPABASE_SECRET_KEY=...


DATABASE_URL=....


CLERK_WEBHOOK_SECRET=....

NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

SMTP_HOST=...
SMTP_USER=.....
SMTP_PASS=....

JWT_SECRET=....
```

## API Documentation

### Base URL

`/api`

### Endpoints

#### GET /api/stories

**Request**:
Query Parameters:

- `page`: number (default: 1)
- `topics`: string (comma separated)
- `sort`: "newest" | "most_viewed" | "highest_rated"
- `time`: "today" | "week" | "month" | "all"

**Response**:

```json
{
  "statusCode": 200,
  "message": "Stories filtered successfully",
  "data": [
    {
      "id": "uuid",
      "title": "Story Title",
      "slug": "story-title",
      "excerpt": "Short summary...",
      "featured_image": "url",
      "category": "Technology",
      "created_at": "timestamp",
      "author": {
        "display_name": "John Doe",
        "avatar_url": "url"
      }
    }
  ],
  "meta": {
    "pagination": { "total_items": 100, "total_pages": 10, "current_page": 1 }
  }
}
```

**Errors**:

- 500: Database connection failure

#### POST /api/upload

**Request**:
Multipart/Form-Data:

- `image`: File (Binary)
- `bucket`: string (optional, default: "stories")

**Response**:

```json
{
  "data": {
    "url": "https://supabase.co/storage/v1/object/public/...",
    "path": "userId/filename.png"
  },
  "message": "Image uploaded successfully",
  "status": 200
}
```

**Errors**:

- 401: Unauthorized access
- 400: No file provided

#### GET /api/user/me

**Request**:
Authenticated Header (Clerk Session)

**Response**:

```json
{
  "data": {
    "id": "uuid",
    "clerk_id": "user_...",
    "username": "johndoe",
    "total_revenue": 150.5,
    "total_reads": 1240,
    "avg_reading_time": 5.2
  },
  "statusCode": 200
}
```

**Errors**:

- 404: User profile not found

#### GET /api/user/stories

**Request**:
Query Parameters:

- `page`: number

**Response**:

```json
{
  "data": [],
  "meta": { "total_items": 25, "total_pages": 3 },
  "status": 200
}
```

#### POST /api/user/stories

**Request**:

```json
{
  "title": "The Future of AI",
  "content": "<h1>Content</h1>...",
  "category": "Technology",
  "featured_image": "url",
  "status": "published",
  "tags": ["ai", "future"],
  "series_id": "uuid"
}
```

**Response**:

```json
{
  "data": { "id": "uuid", "slug": "the-future-of-ai-x4k2" },
  "message": "Story published!",
  "status": 201
}
```

**Errors**:

- 400: Validation error (e.g., Missing title or content)

#### GET /api/user/stories/[slug]

**Request**:
URL Parameter: `slug`

**Response**:

```json
{
  "data": {
    "title": "Title",
    "content": "html...",
    "author": { "username": "name" }
  },
  "status": 200
}
```

#### PATCH /api/user/stories/[slug]

**Request**:
URL Parameter: `slug`
Payload:

```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "status": "archived"
}
```

**Response**:

```json
{
  "data": { "id": "uuid", "status": "archived" },
  "message": "Story updated successfully"
}
```

**Errors**:

- 403: Forbidden (Not the author)

#### DELETE /api/user/stories/[slug]

**Request**:
URL Parameter: `slug`

**Response**:

```json
{
  "statusCode": 200,
  "message": "Story deleted",
  "data": { "slug": "target-slug" }
}
```

#### POST /api/webhook/clerk

**Request**:
Headers: `svix-id`, `svix-timestamp`, `svix-signature`
Payload: Clerk Webhook Event Object

**Response**:
Status 200 (Successful Sync)

**Errors**:

- 400: Invalid Svix signature

#### GET /api/categories/search

**Request**:
Query Parameter: `q`

**Response**:

```json
{
  "data": ["Technology", "Technical Writing"],
  "status": 200
}
```

## Technologies Used

| Technology | Role                   |
| :--------- | :--------------------- |
| TypeScript | Language               |
| Node.js    | Runtime                |
| Next.js    | Server & API Framework |
| TypeORM    | Database ORM           |
| PostgreSQL | Database               |
| Supabase   | File Storage           |
| Clerk      | Authentication         |
| Tiptap     | Content Editor         |

## Author Info

- Github: [Alexander Ukwueze](https://github.com/lexizuchenna)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
