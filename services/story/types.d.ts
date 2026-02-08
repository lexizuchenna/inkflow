import { stories } from "@/app/generated/prisma/client";

export interface UploadImageRequest {
  image: File;
}

export interface UploadImageResponse {
  url: string;
  path: string;
}

export interface SaveStoryRequest {
  title: string;
  featured_image: string;
  tags: Array<string> | stories["tags"];
  status: "published" | "draft" | "archived";
  content: string;
  category: string;
}
