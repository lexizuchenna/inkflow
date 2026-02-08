import { stories, users } from "@/app/generated/prisma/client";

export interface UserType extends users {
  total_revenue: number;
  total_reads: number;
  avg_reading_time: number;
  stories: Pick<stories, "id", "slug">;
}
