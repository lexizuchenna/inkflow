import { User } from "@/entities";

export interface UserType extends User {
  total_revenue: number;
  total_reads: number;
  avg_reading_time: number;
}
