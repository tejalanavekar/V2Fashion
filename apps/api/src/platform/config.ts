//zod schema for validation of process.env variables if anything is missing the app crashes with clear mssage.
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
});

export const config = envSchema.parse(process.env);
