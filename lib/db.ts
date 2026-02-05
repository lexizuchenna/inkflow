import "reflect-metadata";
import { DataSource } from "typeorm";

import { Series, Story, User, Earning, Payment, Email } from "@/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV === "development",
  logging: false,
  entities: [User, Story, Series, Earning, Payment, Email],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("InkFlow Database Initialized Successfully");
    }
  } catch (error) {
    console.error("error_initializing_database:", error);
  }
};
