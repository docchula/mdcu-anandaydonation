import { defineConfig, env } from "@prisma/config";
import "dotenv/config"

const databaseUrl = env("DATABASE_URL") ?? process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required for Prisma migrations. Set it in a .env file or in the environment before running `prisma migrate deploy`."
  );
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl,
  },
 
  migrations: {
    path: "prisma/migrations",
  },
});
