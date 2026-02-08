import slugify from "slugify";
import * as cheerio from "cheerio";
import { stories_status_enum } from "@/app/generated/prisma/enums";

export const validateStoryData = (data: any) => {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push("Title is missing or empty.");
  } else if (data.title.length > 255) {
    errors.push("Title exceeds the 255-character limit.");
  }

  if (!data.content?.trim() || data.content === "<p></p>") {
    errors.push("Story content is missing.");
  }

  if (!data.category) {
    errors.push("Category is required.");
  }

  if (!data.status) {
    errors.push("Status is required (draft, published, or archived).");
  } else if (!Object.values(stories_status_enum).includes(data.status)) {
    errors.push("Invalid status type provided.");
  }

  if (!data.featured_image?.trim()) {
    errors.push("A featured cover image is required.");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: {
      title: data.title?.trim() || "",
      content: data.content || "",
      category: data.category || "Technology",
      status: data.status || stories_status_enum.draft,
      featured_image: data.featured_image || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      slug: data.title ? generateSlug(data.title) : "",
    },
  };
};

const generateSlug = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .substring(0, 200);
};

export const assignHeadingIds = (content: string): string => {
  const $ = cheerio.load(content, null, false);

  const headings = $("h2, h3");

  // 3. Iterate and assign IDs
  headings.each((_, element) => {
    const $heading = $(element);
    const text = $heading.text() || "";
    const slug = slugify(text);

    if (slug) {
      $heading.attr("id", slug);
    }
  });

  return $.html();
};
