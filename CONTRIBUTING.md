# Contributing to InkFlow

First off, thank you for considering contributing to **InkFlow**! It’s people like you who make this editorial engine a better place for writers and readers globally.

## Code of Conduct

By participating in this project, you agree to abide by our standards:

- Be respectful and inclusive.
- Focus on what is best for the community.
- Gracefully accept constructive criticism.

## Getting Started

### 1. Fork and Clone

Fork the repository to your own GitHub account and clone it locally:

```bash
git clone https://github.com/YOUR_USERNAME/inkflow.git
cd inkflow
```

### 2. Environment Setup

Copy the example environment variables and fill in your local credentials:

```bash
cp .env.example .env
```

> **Note:** You will need your own Clerk keys and Supabase bucket for local testing of authentication and image uploads.

### 3. Install Dependencies

We use **pnpm** for fast, disk-efficient package management:

```bash
pnpm install
```

## Development Guidelines

### Database & TypeORM

We use **Prisma** with **PostgreSQL**. If you are adding new features that require data persistence:

- **Migrations:** Never manually alter the database schema. Generate a migration:

- **Strict Typing:** Ensure all relations and columns are strictly typed. Avoid using `any`.

### Tech Stack Standards

- **Next.js 16:** Use the `app/` directory and Server Components by default. Use `"use client"` only when browser interactivity is required.
- **Styling:** Use Tailwind CSS variables defined in `@theme` to ensure consistency with the InkFlow editorial brand (Paper/Ink colors).
- **Icons:** Use `lucide-react`.

## 📨 Submitting Changes

### Branching Strategy

Create a branch for your work:

- `feat/` for new features
- `fix/` for bug fixes
- `docs/` for documentation changes

Example:

```bash
git checkout -b feat/social-share-buttons
```

### Pull Request (PR) Process

- **Format Your Code:** Run `pnpm lint` and `pnpm format`.
- **Self-Review:** Ensure your code doesn't break existing editorial flows.
- **Describe Your PR:** Use a clear title and explain the _why_ and _how_ of your changes.
- **Wait for Review:** A maintainer will review your code. Be prepared to make iterative changes.

## Reporting Issues

If you find a bug, please open an issue with:

- A clear, descriptive title
- Steps to reproduce the bug
- Expected vs. actual behavior
- Screenshots (if UI-related)

## Creative Contributions

InkFlow isn't just about code. We welcome:

- **UI/UX Suggestions:** Enhancing the Tiptap editor experience
- **Documentation:** Improving the API docs or this guide
- **Templates:** New editorial themes for the reader view

## Security

If you discover a security vulnerability (especially regarding Clerk auth or Svix webhooks), please **do not** open a public issue.  
Instead, email the lead maintainer at **contact@mail.lexiz.is-a.dev**.
