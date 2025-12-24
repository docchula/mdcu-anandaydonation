import { defineConfig, env } from "@prisma/config";
import "dotenv/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "mysql://dummy:dummy@localhost:3306/dummy",
  },
 
  migrations: {
    path: "prisma/migrations",
  },
});
