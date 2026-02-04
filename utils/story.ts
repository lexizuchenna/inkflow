import slugify from "slugify";
import { JSDOM } from "jsdom";

import { StoryStatus } from "@/entities/story.entity";

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
  } else if (!Object.values(StoryStatus).includes(data.status)) {
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
      status: data.status || StoryStatus.DRAFT,
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
  let doc: Document;

  if (typeof window === "undefined") {
    doc = new JSDOM(content).window.document;
  } else {
    const parser = new DOMParser();
    doc = parser.parseFromString(content, "text/html");
  }

  const headings = doc.querySelectorAll("h2, h3");

  headings.forEach((heading) => {
    const text = heading.textContent || "";

    const slug = slugify(text);

    if (slug) {
      heading.id = slug;
    }
  });

  return doc.body.innerHTML;
};
