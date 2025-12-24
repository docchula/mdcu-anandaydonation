import { defineConfig, env } from "@prisma/config";
import dotenv from "dotenv";

// Load .env before resolving env vars so Prisma can read DATABASE_URL when running prisma CLI
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
 
  migrations: {
    path: "prisma/migrations",
  },
});