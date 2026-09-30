//for the drizzle kit to generate the types for the database tables and migrations

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/modules/*/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres",
  },
  schemaFilter: ["catalog"],
});
